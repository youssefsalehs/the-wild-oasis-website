"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  updateGuest as updateGuestApi,
  deleteBooking as deleteBookingApi,
  updateBooking as updateBookingApi,
  createBooking as createBookingApi,
  getBookings,
} from "./data-service";
import { redirect } from "next/navigation";
export const updateGuest = async (formData) => {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality")?.split("%");
  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID))
    throw new Error("please provide a valid national id ");
  const updateData = { nationalID, nationality, countryFlag };
  updateGuestApi(session?.user?.guestId, updateData);
  revalidatePath("/account");
};
export const updateBooking = async (formData) => {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((b) => b.id);
  const bookingId = Number(formData.get("bookingId"));
  const updatedData = {
    observations: formData.get("observations").slice(0, 1000),
    numGuests: Number(formData.get("numGuests")),
  };

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("you're not allowed to update this booking");

  await updateBookingApi(bookingId, updatedData);
  redirect("/account/reservations");
};
export const deleteBooking = async (bookingId) => {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((b) => b.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("you're not allowed to delete this booking");
  deleteBookingApi(bookingId);
  revalidatePath("/account/reservations");
};
export const createBooking = async (bookingData, formData) => {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    isPaid: false,
    totalPrice: bookingData.cabinPrice,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  console.log(newBooking);
  createBookingApi(newBooking);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
};
export const signInAction = async () => {
  await signIn("google", { redirectTo: "/account" });
};
export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};

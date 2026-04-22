import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-2 font-semibold text-primary-200 w-full">
        <ArrowLeftEndOnRectangleIcon width={30} height={30} />

        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;

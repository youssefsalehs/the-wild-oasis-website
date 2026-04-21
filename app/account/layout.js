import SideNavigation from "../_components/SideNavigation";
export default function Layout({children}) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-20">
        <SideNavigation/>
        <side className="py-1">{children}</side>
    </div>
  )
}

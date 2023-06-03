import DesktopNavigation from "@/components/layout/DesktopNavigation";
import MobileNavigation from "@/components/layout/MobileNavigation";

const Navbar = () => {


  return <header className="py-3 border-b border-slate-200">
    <div className="w-[90%] mx-auto">
      {/* Desktop Navigation Starts*/}
      <DesktopNavigation />
      {/* Desktop Navigation Ends*/}

      {/* Mobile Navigation Starts*/}
      <MobileNavigation />
      {/* Mobile Navigation Ends*/}
    </div>
  </header>;
};
export default Navbar;

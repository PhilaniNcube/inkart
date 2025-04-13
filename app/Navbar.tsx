import Container from "@/components/layout/Container";
import DesktopNavigation from "@/components/layout/DesktopNavigation";
import MobileNavigation from "@/components/layout/MobileNavigation";





const Navbar =  () => {



  return (
    <header className="border-b border-slate-200">
      <Container>
        {/* Desktop Navigation Starts*/}
        <DesktopNavigation />
        {/* Desktop Navigation Ends*/}

        {/* Mobile Navigation Starts*/}
        <MobileNavigation  />
        {/* Mobile Navigation Ends*/}
      </Container>
    </header>
  );
};
export default Navbar;

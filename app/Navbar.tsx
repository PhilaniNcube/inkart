import Container from "@/components/layout/Container";
import DesktopNavigation from "@/components/layout/DesktopNavigation";
import MobileNavigation from "@/components/layout/MobileNavigation";
import { User } from "@supabase/auth-helpers-nextjs";

const Navbar =  ({user}:{user:User | null}) => {


  return (
    <header className="border-b border-slate-200">
      <Container>
        {/* Desktop Navigation Starts*/}
        <DesktopNavigation user={user} />
        {/* Desktop Navigation Ends*/}

        {/* Mobile Navigation Starts*/}
        <MobileNavigation />
        {/* Mobile Navigation Ends*/}
      </Container>
    </header>
  );
};
export default Navbar;

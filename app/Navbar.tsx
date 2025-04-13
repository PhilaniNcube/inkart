import Container from "@/components/layout/Container";
import DesktopNavigation from "@/components/layout/DesktopNavigation";
import MobileNavigation from "@/components/layout/MobileNavigation";
import { Database } from "@/types";
import { User } from "@supabase/supabase-js";



type ComponentProps = {
  user: User | null;
  categories: Database['public']['Tables']['categories']['Row'][];
  admin:boolean;
}

const Navbar =  ({user, categories, admin}:ComponentProps) => {



  return (
    <header className="border-b border-slate-200">
      <Container>
        {/* Desktop Navigation Starts*/}
        <DesktopNavigation user={user} categories={categories} admin={admin} />
        {/* Desktop Navigation Ends*/}

        {/* Mobile Navigation Starts*/}
        <MobileNavigation user={user} />
        {/* Mobile Navigation Ends*/}
      </Container>
    </header>
  );
};
export default Navbar;

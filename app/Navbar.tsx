import Container from "@/components/layout/Container";
import DesktopNavigation from "@/components/layout/DesktopNavigation";
import MobileNavigation from "@/components/layout/MobileNavigation";
import { Database } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";

type ComponentProps = {
  user: User | null;
  categories: Database['public']['Tables']['categories']['Row'][];
}

const Navbar =  ({user, categories}:ComponentProps) => {


  return (
    <header className="border-b border-slate-200">
      <Container>
        {/* Desktop Navigation Starts*/}
        <DesktopNavigation user={user} categories={categories} />
        {/* Desktop Navigation Ends*/}

        {/* Mobile Navigation Starts*/}
        <MobileNavigation />
        {/* Mobile Navigation Ends*/}
      </Container>
    </header>
  );
};
export default Navbar;

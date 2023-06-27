import Container from "@/components/layout/Container";
import DesktopNavigation from "@/components/layout/DesktopNavigation";
import MobileNavigation from "@/components/layout/MobileNavigation";
import { fetchCategories } from "@/lib/fetchers/products";
import { Database } from "@/types";
import { User, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type ComponentProps = {
  user: User | null;
  categories: Database['public']['Tables']['categories']['Row'][];
}

const Navbar =  async () => {

    const supabase = createServerComponentClient({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    let { data: admin, error } = await supabase.rpc("is_admin");

    const categories = await fetchCategories();

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

"use client";

import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import analytics from "@/utils/analytics";
import { useRouter } from "next/navigation";
import { Database } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabase] = useState(() => createClient());
  const router = useRouter();

  useEffect(() => {
    analytics.page();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase }}>
      {children}
    </Context.Provider>
  );
};

export default SupabaseProvider;

export const useSupabase = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  } else {
    return context;
  }
};

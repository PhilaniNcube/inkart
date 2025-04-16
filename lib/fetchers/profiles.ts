import { Database } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const fetchProfiles = async (page: number, page_size: number) => {
  const supabase = await createClient();

  const start = (page - 1) * page_size;

  const end = start + page_size;

  const {
    data: profiles,
    error,
    count,
  } = await supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .range(start, end)
    .order("first_name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return {
    profiles: profiles as Database["public"]["Tables"]["profiles"]["Row"][],
    count,
  };
};

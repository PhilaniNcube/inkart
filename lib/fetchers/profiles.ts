import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const fetchProfiles = async (page: number, page_size: number) => {

  const supabase = createServerComponentClient<Database>({ cookies });

const start = (page - 1 ) * page_size;

const end = start + page_size;

const {data:profiles, error, count} = await supabase.from('profiles').select('*',  {count: 'exact'}).range(start, end).order('first_name', {ascending: true});

if (error) {
  throw new Error(error.message)
}

return {
  profiles,
  count
}
}

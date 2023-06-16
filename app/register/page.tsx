import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const CALLBACK = process.env.CALLBACK_URL || "http://localhost:3000/auth/callback"

const page = async () => {

  const registerAction = async (data:FormData) => {
    'use server'

    const supabase = createServerActionClient<Database>({ cookies });

    const { email, password, first_name, last_name } = Object.fromEntries(
      data.entries()
    );



    if( typeof email !== 'string' || typeof password !== 'string' || typeof first_name !== 'string' || typeof last_name !== 'string') {
       throw new Error(`Invalid details`)
    }

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${CALLBACK}`,
        data: {
          first_name,
          last_name,
        },
      },
    });

   if(error) {
      throw new Error(error.message)
   }




   revalidatePath("/");

}

  return (
    <main>
      <Container>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-5xl font-medium">
              Create an account
            </h1>
            <form action={registerAction} className="w-full mt-6">
              <div className="flex flex-col space-y-3 w-2/3">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" name="first_name" className="" />
              </div>
              <div className="flex flex-col space-y-3 w-2/3 mt-3">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" name="last_name" className="" />
              </div>
              <div className="flex flex-col space-y-3 w-2/3 mt-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" className="" />
              </div>
              <div className="flex flex-col space-y-3 w-2/3 mt-3">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" className="" />
              </div>
              <div className="mt-8">
                <Button type="submit">Register</Button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/3"></div>
        </div>
      </Container>
    </main>
  );
};
export default page;

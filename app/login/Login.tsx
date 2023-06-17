"use client"
import Container from "@/components/layout/Container";
import { FormEvent, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {SubmitHandler, useForm} from "react-hook-form"
import { useSupabase } from "@/components/Providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

const Login = ({ title, page}: { title: string, page:string }) => {
  const router = useRouter();

  const { supabase } = useSupabase();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,

    });

    if (error) {
      alert(error.message);
    }
    alert("Login was successful");
    setLoading(false);
    router.push(`${page}`);
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-medium">{title}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl mx-auto mt-6 flex flex-col items-center"
        >
          <div className="flex flex-col space-y-3 w-2/3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
          <div className="flex flex-col space-y-3 w-2/3 mt-6">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>

          <div className="mt-10 w-2/3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Login"}
            </Button>
          </div>
        </form>
         <div
          className="w-full max-w-4xl mx-auto mt-6 flex items-center"
        >
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline text-blue-500 hover:text-blue-700"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};
export default Login;

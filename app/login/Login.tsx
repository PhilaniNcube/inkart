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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

const Login = () => {

  const {supabase} = useSupabase()

  const [loading, setLoading] = useState(false)

    const {register, handleSubmit, clearErrors, formState: {errors}} = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { email, password } = data;
  };

  return (
    <Container>
      <div>
        <h1 className="text-3xl md:text-4xl font-medium">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl mt-6"
        >
          <div className="flex flex-col space-y-3 w-2/3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
          <div className="flex flex-col space-y-3 w-2/3 mt-6">
            <Label htmlFor="password">Password</Label>
            <Input  id="password" type="password" {...register("password")} />
          </div>

          <div className="mt-10">
            <Button type="submit" className="w-2/3" disabled={loading}>{loading ? 'Saving...' : 'Login'}</Button>
          </div>
        </form>
      </div>
    </Container>
  );
};
export default Login;

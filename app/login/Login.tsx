"use client"
import Container from "@/components/layout/Container";
import { useEffect, useActionState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/actions/auth";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

// Define the schema for validation
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
});

// Define the state type
type LoginState = {
  error?: string;
  success?: boolean;
};

const initialState: LoginState = {
  error: undefined,
  success: false,
};

const Login = ({ title, page }: { title: string, page: string }) => {
 
  const [state, action, isPending] = useActionState(
    login, 
    initialState
  );
  
  const { toast } = useToast();

  // Show errors in toast notifications
  useEffect(() => {
    if (state.error) {
      toast({
        title: "Login Failed",
        description: state.error,
        variant: "destructive",
      });
    } else if (state.success) {
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
        variant: "default",
      });
    }
  }, [state, toast]);

  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-medium">{title}</h1>
        <form
          action={action}
          className="w-full max-w-4xl mx-auto mt-6 flex flex-col items-center"
        >
          {/* Hidden redirect field */}
          <input type="hidden" name="redirectTo" value={page} />
          
          <div className="flex flex-col space-y-3 w-2/3">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="flex flex-col space-y-3 w-2/3 mt-6">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password"
              type="password"
              required
            />
          </div>

          <div className="mt-10 w-2/3">
            <Button type="submit" className="w-full">
              Login
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



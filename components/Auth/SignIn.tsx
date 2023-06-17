"use client"
import { Input } from "../ui/input";
import { Label } from "../ui/label";


const SignIn = () => {
  return <div className="container mx-auto flex flex-col h-full w-full justify-center space-y-6 sm:w-[400px]">
    <form className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
      <p className="text-sm max-w-xs mx-auto">
        Please sign in to continue.
      </p>
      <div className="flex flex-col items-start space-y-2 mt-4">
        <Label htmlFor="email">Email Address</Label>
        <Input type="email" id="email" name="email" placeholder="joe@example.com" autoComplete="email" />
      </div>
      <div className="flex flex-col items-start space-y-2 mt-4">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password"  />
      </div>
    </form>
  </div>;
};
export default SignIn;

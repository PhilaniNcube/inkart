import SignIn from "@/components/Auth/SignIn";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const page = () => {
  return <div className="flex w-full z-[9999] h-screen">
    <div className="h-full w-full max-w-2xl mx-auto flex flex-col items-center justify center gap-20">
      {/* <Link href="/" className={cn(buttonVariants({
        variant: "ghost"
      }), 'self-start -mt-20')}>Home</Link> */}
      <SignIn />
    </div>
  </div>;
};
export default page;

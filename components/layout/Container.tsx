import { ReactNode } from "react";

const Container = ({children}:{children:ReactNode}) => {
  return <div className="w-[90%] max-w-7xl mx-auto py-10">{children}</div>;
};
export default Container;

import { Flow } from "../flow/Flow";
import Footer from "./footer/Footer";
import { Navbar } from "./navbar/Navbar"

export const Layout = (props:any) => {
  return (
    <div>
        <Flow />
        <Navbar />
        <main>{props.children}</main>
        <Footer />
    </div>
  );
};

import { Link } from "react-router-dom";
import logo from "../../assets/Logologo.png";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="w-full z-50 bg-gray-900 flex justify-between items-center px-5 py-3 fixed top-0">
      <Link to="/" className="">
        <img
          src={logo}
          alt="logo"
          className="h-[40px] w-[40px] object-cover m-1 sm:m-0"
          height={40}
          width={40}
        />
      </Link>
      <div className="w-full max-w-xs">
        <input
          className="hidden md:flex w-full rounded-md bg-gray-700 focus:ring-2 focus:ring-[#AE7AFF] outline-none border-none p-2"
          placeholder="Search here..."
        />
      </div>
      <div className="flex gap-3 items-center">
        {[
          {
            size: "sm",
            content: "Log In",
            link: "/sign-in",
          },
          {
            link: "/sign-up",
            size: "sm",
            content: "Sign Up",
          },
        ].map((item, index) => (
          <Button
            key={index}
            size={item.size}
            className="text-white bg-[#AE7AFF] hover:bg-[#8E63E8]"
          >
            <Link key={index} to={item.link}>
              {item.content}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Header;

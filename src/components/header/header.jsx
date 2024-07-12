/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import logo from "../../assets/Logologo.png";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.user);

  return (
    <div className="w-full z-50 bg-gray-900 flex justify-between items-center px-10 py-3 fixed top-0">
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
        {authStatus && userData && (
          <>
            <Button
              className="bg-gray-500 hover:bg-slate-400"
              // onClick={handleLogout}
            >
              Logout
            </Button>
            <div className="mb-8 mt-auto px-4 sm:mb-0 sm:mt-0 sm:px-0">
              <Link
                to={`/channel/${userData?.username}/videos`}
                className="flex w-full gap-4 text-left sm:items-center"
              >
                <img
                  src={userData.avatar?.url}
                  alt={userData.username}
                  className="object-cover h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12"
                />
                <div className="w-full pt-2 sm:hidden">
                  <h6 className="font-semibold">{userData.fullName}</h6>
                  <p className="text-sm text-gray-300">{userData.username}</p>
                </div>
              </Link>
            </div>
          </>
        )}

        {!authStatus && (
          <Button
            asChild
            size={"sm"}
            variant="outlined"
            className="text-white border border-[#8E63E8] hover:bg-[#8E63E8]"
          >
            <Link to={"/sign-in"}>Log In</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;

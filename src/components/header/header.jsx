/* eslint-disable no-unused-vars */
import { LineChart, LogOut, Settings, Users2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/Logologo.png";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "@/hooks/auth.hook";
import { setUser } from "@/features/auth.slice";

const Header = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.user);

  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    const sessionStatus = await logout();
    if (sessionStatus) {
      dispatch(setUser(null));
    }
  };

  return (
    <div className="w-full z-50 bg-gray-900 flex justify-between items-center px-10 py-3 fixed top-0">
      <Link to="/" className="flex gap-1 items-center">
        <img
          src={logo}
          alt="logo"
          className="h-[40px] w-[40px] object-cover m-1 sm:m-0"
          height={40}
          width={40}
        />
        <span className="text-white text-lg font-bold">Vidz</span>
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
            <div className="flex items-center">
              <DropdownMenu className="">
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <img
                      src={userData.avatar?.url}
                      width={36}
                      height={36}
                      alt={userData.username}
                      className="overflow-hidden rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-full bg-slate-900 space-y-1 text-white border border-slate-700"
                  align="end"
                >
                  {[
                    {
                      title: "My Account",
                      icon: <Users2 className="w-4 h-4" />,
                      href: `/channel/${userData?.username}/videos`,
                    },
                    {
                      title: "DashBoard",
                      icon: <LineChart className="w-4 h-4" />,
                      href: "/dashboard",
                    },
                    {
                      title: "Settings",
                      icon: <Settings className="w-4 h-4" />,
                      href: "/settings",
                    },
                  ].map((item, index) => (
                    <DropdownMenuItem
                      asChild
                      key={index}
                      className="flex gap-2 items-center focus:bg-slate-800 focus:text-slate-50 cursor-pointer"
                    >
                      <Link to={item.href} className="flex gap-2 items-center">
                        <span>{item.icon}</span>
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex gap-2 items-center focus:bg-red-500/90 focus:text-slate-50"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

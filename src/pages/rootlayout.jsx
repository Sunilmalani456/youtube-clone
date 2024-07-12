/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import LeftSidebar from "../components/LeftSidebar/leftSidebar";
import { useCurrentUser } from "@/hooks/auth.hook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/features/auth.slice";

const RootLayout = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.userData);
  const { data: userData, isFetching, error } = useCurrentUser();

  useEffect(() => {
    if (!isFetching) {
      if (userData && !user) {
        dispatch(setUser(userData));
      }
      setIsLoading(false);
    }
  }, [userData, isFetching, dispatch, user]);

  if (isLoading || isFetching) {
    return (
      <div className="w-full font-bold text-2xl flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="w-full relative">
      <Header />
      {/* MIDDLE SECTION */}
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 max-md:pb-14 sm:px-14 bg-red-400">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default RootLayout;

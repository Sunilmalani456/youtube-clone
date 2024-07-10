import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import LeftSidebar from "../components/LeftSidebar/leftSidebar";

const RootLayout = () => {
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

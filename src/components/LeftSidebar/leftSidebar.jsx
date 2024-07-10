import { AiOutlineHome } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { GoDeviceCameraVideo } from "react-icons/go";
import { LiaUserCheckSolid } from "react-icons/lia";
import { LuHistory } from "react-icons/lu";

const LeftSidebar = () => {
  const sidebarItems = [
    {
      name: "Home",
      path: "/",
      icon: <AiOutlineHome />,
      onMobile: true,
    },
    {
      name: "Liked Videos",
      path: "/liked-videos",
      icon: <BiLike />,
      onMobile: false,
    },
    {
      name: "History",
      path: "/history",
      icon: <LuHistory />,
      onMobile: true,
    },
    {
      name: "My Channel",
      path: `/channel/username/videos`,
      icon: <GoDeviceCameraVideo />,
      onMobile: false,
    },
    {
      name: "My Studio",
      path: "/my-studio",
      icon: <BsCollectionPlay />,
      onMobile: true,
    },
    {
      name: "Subscriptions",
      path: "/subscriptions",
      icon: <LiaUserCheckSolid />,
      onMobile: true,
    },
    {
      name: "Tweets",
      path: "/tweets",
      icon: <FaRegCommentDots />,
      onMobile: true,
    },
  ];

  return (
    <section className="sticky bg-transparent left-0 top-0 pt-16 flex h-screen flex-col justify-between overflow-y-auto border-r max-sm:hidden lg:w-[266px]">
      {sidebarItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-full h-[60px] cursor-pointer hover:bg-gray-900"
        >
          {item.icon}
          <span className="hidden ml-2 text-sm font-medium lg:block">
            {item.name}
          </span>
        </div>
      ))}
    </section>
  );
};

export default LeftSidebar;

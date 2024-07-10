import { AiOutlineHome } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { GoDeviceCameraVideo } from "react-icons/go";
import { LiaUserCheckSolid } from "react-icons/lia";
import { LuHistory } from "react-icons/lu";

const Home = () => {
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
  return <div className="pt-16">Home</div>;
};

export default Home;

// components/Sidebar.js
import { useState } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase/firebase";
import { useRouter } from "next/navigation";
import { ToggleThemeButton } from "./components/ToogleThemeButton";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFinishedExpanding, setIsFinishedExpanding] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };
  const handleMouseLeave = () => {
    setIsExpanded(false);
    setIsFinishedExpanding(false);
  };
  const handleTransitionEnd = () => {
    setIsFinishedExpanding(isExpanded);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTransitionEnd={handleTransitionEnd}
      className={`fixed top-0 left-0 h-screen bg-zinc-200 dark:bg-zinc-800 rounded-md my-1 ml-1 shadow-md shadow-black dark:text-white flex flex-col transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex-1 mt-6 pl-1">
          <Link
            href="/"
            className={`py-2 px-4 hover:bg-gray-700 flex items-center space-x-2 ${
              isFinishedExpanding ? "" : "pointer-events-none"
            }`}
          >
            <HomeIcon className="h-6 w-6" />
            {isFinishedExpanding && (
              <span className="transition-all">Home</span>
            )}
          </Link>
          <div
            className={`py-2 px-4 hover:bg-gray-700 flex items-center space-x-2 ${
              isFinishedExpanding ? "" : "pointer-events-none"
            }`}
          >
            <ToggleThemeButton />
            {isFinishedExpanding && (
              <span className="transition-all">Toggle Theme</span>
            )}
          </div>
        </div>
        <div className="flex-1 mt-6 pl-1">
          <h1
            className={`py-2 px-4 hover:bg-gray-700 flex items-center space-x-2 ${
              isFinishedExpanding ? "" : "pointer-events-none"
            }`}
            onClick={handleLogout}
          >
            X
          </h1>
          {isFinishedExpanding && <span className="transition-all">Sair</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

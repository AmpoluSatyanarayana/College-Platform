"use client";

import Link from "next/link";
import { useEffect, useState,useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaUser,FaChartBar,FaHome,FaSignOutAlt,FaBookmark,FaUniversity } from "react-icons/fa";

export default function Navbar() {


  const {user,updateUser,clearUser}= useAuth();
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] =useState(false);
  const router = useRouter();

const profileRef = useRef<HTMLDivElement>(null);

useEffect(() => {

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(
        event.target as Node
      )
    ) {
      setShowProfile(false);
    }
    
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

}, []);


 const handleLogout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
  });
  clearUser();
  router.refresh();
  router.push("/");
  };
  
  useEffect(() => {
  console.log("USER CHANGED:", user);
}, [user]);

const isLoggedIn = !!user;
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">

      <div className="container-custom h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center font-bold text-slate-900">
            C
          </div>

          <span className="text-2xl font-bold text-slate-900">
            CollegeFinder
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">

          <Link
            href="/"
            className="text-slate-600 hover:text-blue-600 transition flex items-center gap-2"
          >
           <FaHome/> Home
          </Link>
          {isLoggedIn ? (
            <>

              <Link
                href="/colleges"
                className="text-slate-600 hover:text-blue-600 transition flex items-center gap-2"
              >
                <FaUniversity/>Colleges
              </Link>


              <Link
                href="/compare"
                className="text-slate-600 hover:text-blue-600 transition flex items-center gap-2"
              >
               <FaChartBar/> Compare
              </Link>

              <Link
                href="/saved"
                className="text-slate-600 hover:text-blue-600 transition flex items-center gap-2"
              >
                <FaBookmark />Saved
              </Link>

<div className="relative" ref={profileRef}>

  <button
    onClick={() =>
      setShowProfile(!showProfile)
    }
    className="flex items-center gap-3"
  >

    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
      {user?.name?.charAt(0).toUpperCase()}
    </div>

    <span className="font-medium">
      {user?.name}
    </span>

  </button>

  {showProfile && (

    <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border z-50">

      <div className="p-4 border-b">

        <p className="font-semibold">
          {user?.name}
        </p>

        <p className="text-sm text-slate-500">
          {user?.email}
        </p>

      </div>

      <div className="py-2">

        <Link
          href="/saved"
          className="block px-4 py-2 hover:bg-slate-100 flex items-center gap-2"
        >
          <FaBookmark /> Saved Colleges
        </Link>

        <Link
          href="/profile"
          className="block px-4 py-2 hover:bg-slate-100 flex items-center gap-2"
        >
          <FaUser /> My Profile
        </Link>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 flex items-center gap-2"
        >
          <FaSignOutAlt/> Logout
        </button>

      </div>

    </div>

  )}

</div>
            </>
          ) : (
            <>
              <Link
                href="/login"
               className="inline-block text-center px-5 py-2  text-white bg-blue-500  rounded-md font-medium hover:bg-blue-600 "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}
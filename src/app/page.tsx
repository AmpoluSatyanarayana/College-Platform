"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {FaSearch,FaChartBar  } from "react-icons/fa";

export default function HomePage() {


  const {user,loading}= useAuth();

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
  const isLoggedIn = !!user;

  return (

    <>
    <section className="container-custom py-8 sm:py-10">

      <div className="max-w-5xl mx-auto text-center">

        <span className="inline-block px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 font-medium mb-6">
          🎓 Discover Your Perfect College
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">

          Find, Compare & Save

        <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Top Colleges In India
        </span>

        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 sm:mt-6 max-w-2xl mx-auto px-2 sm:px-0">

          Search colleges, compare fees and ratings,
          explore details, and save your favorites —
          all in one platform.

        </p>

        {!isLoggedIn ? (
       <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10 px-4 sm:px-0">
     
         <Link
           href="/login"
           className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-center"
         >
           Login
         </Link>
     
         <Link
           href="/register"
           className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition text-center"
         >
           Register
         </Link>
     
       </div>
     ) : (
       <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10 px-4 sm:px-0">
     
         <Link
           href="/colleges"
           className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
         >
          <FaSearch />  Explore Colleges
         </Link>
     
         <Link
           href="/compare"
           className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center gap-2"
         >
          <FaChartBar /> Compare Colleges
         </Link>
     
       </div>
     )}

      </div>

    </section>



    {/* //Stats Section */}
<section className="container-custom pb-10 sm:pb-15">

  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">

    <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
      <h3 className="text-xl sm:text-3xl font-bold text-blue-600">
        10+
      </h3>
      <p className="text-slate-600 dark:text-slate-300 mt-2">
        Colleges
      </p>
    </div>

    <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
      <h3 className="text-xl sm:text-3xl font-bold text-blue-600">
        100+
      </h3>
      <p className="text-slate-600 dark:text-slate-300 mt-2">
        Searches
      </p>
    </div>

    <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
      <h3 className="text-xl sm:text-3xl font-bold text-blue-600">
        Secure
      </h3>
      <p className="text-slate-600 dark:text-slate-300 mt-2">
        Authentication
      </p>
    </div>

    <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
      <h3 className="text-xl sm:text-3xl font-bold text-blue-600">
        Fast
      </h3>
      <p className="text-slate-600 dark:text-slate-300 mt-2">
        Search
      </p>
    </div>

  </div>

</section>

</>
  );
}
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
    <section className="container-custom py-10">

      <div className="max-w-5xl mx-auto text-center">

        <span className="inline-block px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium mb-6">
          🎓 Discover Your Perfect College
        </span>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">

          Find, Compare & Save

        <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Top Colleges In India
        </span>

        </h1>

        <p className="text-lg text-slate-600 mt-6 max-w-2xl mx-auto">

          Search colleges, compare fees and ratings,
          explore details, and save your favorites —
          all in one platform.

        </p>

        {!isLoggedIn ? (
       <div className="flex justify-center gap-4 mt-10">
     
         <Link
           href="/login"
           className="px-8 py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
         >
           Login
         </Link>
     
         <Link
           href="/register"
           className="px-8 py-4 rounded-xl border border-slate-300 font-medium hover:bg-slate-100 transition"
         >
           Register
         </Link>
     
       </div>
     ) : (
       <div className="flex justify-center gap-4 mt-10">
     
         <Link
           href="/colleges"
           className="px-8 py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center gap-2"
         >
          <FaSearch />  Explore Colleges
         </Link>
     
         <Link
           href="/compare"
           className="px-8 py-4 rounded-xl border border-slate-300 font-medium hover:bg-slate-100 transition flex items-center gap-2"
         >
          <FaChartBar /> Compare Colleges
         </Link>
     
       </div>
     )}

      </div>

    </section>



    {/* //Stats Section */}
<section className="container-custom pb-15">

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
      <h3 className="text-3xl font-bold text-blue-600">
        10+
      </h3>
      <p className="text-slate-600 mt-2">
        Colleges
      </p>
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
      <h3 className="text-3xl font-bold text-blue-600">
        100+
      </h3>
      <p className="text-slate-600 mt-2">
        Searches
      </p>
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
      <h3 className="text-3xl font-bold text-blue-600">
        Secure
      </h3>
      <p className="text-slate-600 mt-2">
        Authentication
      </p>
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
      <h3 className="text-3xl font-bold text-blue-600">
        Fast
      </h3>
      <p className="text-slate-600 mt-2">
        Search
      </p>
    </div>

  </div>

</section>

</>
  );
}
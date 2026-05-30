"use client";

import { useEffect, useState } from "react";
import CollegeCard from "@/components/college/CollegeCard";
import { FaBookmark } from "react-icons/fa";


export default function SavedPage() {

  const [savedColleges, setSavedColleges] =useState([]);

  useEffect(() => {

    const getSavedColleges = async () => {

    const res = await fetch("/api/saved", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

      const data = await res.json();

      setSavedColleges(data.savedCollege);
      
    };

    getSavedColleges();

  }, []);

const handleRemove = async (
  collegeId: number
) => {

  try {

    const res = await fetch(
      "/api/saved",
      {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          collegeId,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    setSavedColleges((prev) =>
      prev.filter(
        (college: any) =>
          college.college.id !== collegeId
      )
    );

  } catch (error) {

    console.log(error);

  }
};

  return (

    <div className="container-custom py-10">

      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-slate-900 dark:text-slate-100">
        <FaBookmark /> Saved Colleges 
      </h1>

      {savedColleges.length === 0 ? (

        <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl text-center border border-slate-200 dark:border-slate-700">

          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            No Saved Colleges
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Save colleges to view them here.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {savedColleges.map((item:any) => (

            <CollegeCard
              key={item.college.id}
              college={item.college}
              onRemove={handleRemove}
              isSaved={true}
            />

          ))}

        </div>

      )}

    </div>

  );
}
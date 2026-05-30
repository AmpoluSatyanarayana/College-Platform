"use client";

import { College } from "@/types/college";
import Link from "next/link";
import { useState,useEffect } from "react";
import {FaRegBookmark,FaBookmark} from "react-icons/fa";

type Props = {
  college: College;
  isSaved: boolean;
  onRemove?: (collegeId: number) => void;
  onSave?: (collegeId: number) => void;
};

export default function CollegeCard({college,isSaved,onRemove,onSave}: Props) {


  return (
    <div className="bg-white p-5 rounded-xl shadow-md border">
      
      <h2 className="text-xl font-bold">
        {college.name}
      </h2>

      <p className="text-gray-600 mt-2">
        {college.location}
      </p>

      <div className="mt-4 space-y-1">
        <p>
          Fees: ₹{college.fees}
        </p>

        <p>
          Rating: {college.rating}
        </p>
      </div>

      <div className="flex items-center justify-between">

      <Link
        href={`/colleges/${college.id}`}
        className="mt-5 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        See More
      </Link>
    
<button
  onClick={() =>isSaved ? (onRemove?.(college.id)) : (onSave?.(college.id))}
>
  {isSaved ? (
    <FaBookmark
      className="text-blue-600 mt-4"
      size={30}
    />
  ) : (
    <FaRegBookmark
      className="text-slate-400 mt-4"
      size={30}
    />
  )}
</button>
       </div>

    </div>
  );
}
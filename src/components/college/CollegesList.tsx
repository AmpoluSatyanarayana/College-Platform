"use client";

import { useEffect, useMemo, useState } from "react";
import CollegeCard from "./CollegeCard";
import {
  sortColleges,
  type CollegeSortOption,
} from "@/utils/sortColleges";




export default function CollegesList({
  colleges,
}: any) {

  const [savedIds, setSavedIds] =useState<number[]>([]);
  const [sortBy, setSortBy] = useState<CollegeSortOption>("");

  const displayColleges = useMemo(
    () => sortColleges(colleges, sortBy),
    [colleges, sortBy]
  );

  useEffect(() => {

    const getSavedColleges = async () => {

      const res = await fetch("/api/saved");

      const data = await res.json();

      const ids = data.savedCollege.map(
        (item: any) => item.collegeId
      );

      setSavedIds(ids);

    };

    getSavedColleges();

  }, []);

  const handleSave = async (collegeId: number) => {
  try {
    const res = await fetch(
      "/api/saved",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          collegeId,
        }),
      }
    );

    if (!res.ok) {
      throw new Error();
    }

    setSavedIds((prev) => [
      ...prev,
      collegeId,
    ]);
  } catch (error) {
    console.log(error);
  }
};

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

    setSavedIds((prev) =>
      prev.filter(
        (id) => id !== collegeId
      )
    );

  } catch (error) {

    console.log(error);

  }
};

  return (
    <>
    <div className="mb-6">
      <label
        htmlFor="college-sort"
        className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200"
      >
        Sort By
      </label>
      <select
        id="college-sort"
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as CollegeSortOption)
        }
        className="border border-slate-300 dark:border-slate-600 p-3 rounded-lg w-full max-w-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
      >
        <option value="">Select sort option</option>
        <option value="rating-desc">Rating: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="placement-desc">Placement %: High to Low</option>
        <option value="placement-asc">Placement %: Low to High</option>
        <option value="fees-asc">Fees: Low to High</option>
        <option value="fees-desc">Fees: High to Low</option>
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {displayColleges.map((college: any) => (
        <CollegeCard
          key={college.id}
          college={college}
          isSaved={savedIds.includes(college.id)}
          onRemove={handleRemove}
          onSave={handleSave}
        />
      ))}

    </div>
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import CollegeCard from "./CollegeCard";




export default function CollegesList({
  colleges,
}: any) {

  const [savedIds, setSavedIds] =useState<number[]>([]);

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

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {colleges.map((college: any) => (
        <CollegeCard
          key={college.id}
          college={college}
          isSaved={savedIds.includes(college.id)}
          onRemove={handleRemove}
          onSave={handleSave}
        />
      ))}

    </div>

  );
}
"use client";

import { useState } from "react";
import CompareTable from "@/components/college/CompareTable";
import CollegeSearch from "@/components/college/CollegeSearch";
import {FaChartBar} from "react-icons/fa";
import { College } from "@/types/college";

export default function ComparePage() {

  const [results,setResults] =useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [compareData, setCompareData] = useState<College[]>([]);

  const handleCompare = async () => {

     try {
     const ids = selectedColleges.map((college:any) => college.id).join(",");

     const res = await fetch(`/api/compare?ids=${ids}`);

     const data = await res.json();

      setCompareData(data);

    } catch (error) {
    console.log(error);
    }
  };

    const addCollege = (college: any) => {

    if (
       selectedColleges.some(
         (c: any) => c.id === college.id
       )
     ) {
       return;
     }

     if (selectedColleges.length >= 3) {
       alert("Maximum 3 colleges");
       return;
     }

      setSelectedColleges([...selectedColleges, college]);

      setSearch("");
      setResults([]);
    };

  return (
    <div className="container-custom py-6 sm:py-10">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-2 text-slate-900 dark:text-slate-100">
      <FaChartBar/> Compare Colleges
      </h1>

      <CollegeSearch addCollege={addCollege} search={search} setSearch={setSearch} results={results} setResults={setResults}/>

      <div className="mt-8">

        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
          Selected Colleges
        </h2>

        {selectedColleges.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No colleges selected. Select atleast 2 to compare.
          </p>
        ) : (
          <div className="space-y-2">
             {selectedColleges.map((college: any) => (

               <div
                 key={college.id}
                 className="flex items-center justify-between gap-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 rounded-lg text-slate-900 dark:text-slate-100"
               >
                 <span className="min-w-0 break-words">{college.name}</span>

                 <button
                   onClick={() =>
                     setSelectedColleges(
                       selectedColleges.filter(
                         (c: any) => c.id !== college.id
                       )
                     )
                   }
                 >
                   ❌
                 </button>
               </div>
             ))}
          </div>
        )}

      </div>

         {selectedColleges.length >= 2 && (
            <button
              onClick={handleCompare}
              className="mt-6 sm:mt-8 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Compare Colleges
             </button>
          )}


{compareData.length > 0 && <CompareTable compareData={compareData}/>}
    </div>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);



  const router = useRouter();

const handleSearch = async (
  value: string
) => {

  setSearch(value);

  if (!value.trim()) {
    setResults([]);
    return;
  }

  try {

    const res = await fetch(
      `/api/colleges?search=${value}`
    );

    const data = await res.json();

    setResults(data);

  } catch (error) {

    console.log(error);

  }
};

  return (
    <div className="mb-8">
    
      <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Search colleges..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="border border-slate-300 dark:border-slate-600 p-3 rounded-lg w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
      />

      <button
       onClick={() => router.push(`/colleges?search=${search}`)}
       className="bg-blue-600 text-white px-5 py-3 sm:py-0 rounded-lg w-full sm:w-auto shrink-0"
      >
        Search
      </button>

      <button
        onClick={() => 
          {
            setSearch("");
            setResults([]);
            router.replace("/colleges");
          }}
        className="bg-red-400 text-white rounded-lg px-4 py-3 sm:py-0 w-full sm:w-auto shrink-0"
      >
        Clear Search
      </button>
    </div>

      {results.length > 0 && (

           <div className="mt-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow">

             {results.map((college: any) => (

               <div
                 key={college.id}
                 onClick={() =>{
                  setSearch(college.name);
                  setResults([]);
                   router.push(
                     `/colleges?search=${college.name}`
                   )
                 }}
                 className="p-3 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
               >
                 {college.name}
               </div>

             ))}

           </div>

    )}
    </div>
  );
}
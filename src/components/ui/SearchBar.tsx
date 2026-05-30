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
    
      <div className="flex gap-3">
      <input
        type="text"
        placeholder="Search colleges..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-3 rounded-lg w-full"
      />

      <button
       onClick={() => router.push(`/colleges?search=${search}`)}
       className="bg-blue-600 text-white px-5 rounded-lg"
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
        className=" bg-red-400 text-white rounded-lg px-4"
      >
        Clear Search
      </button>
    </div>

      {results.length > 0 && (

           <div className="mt-2 border border-slate-200 rounded-lg bg-white shadow">

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
                 className="p-3 hover:bg-slate-100 cursor-pointer"
               >
                 {college.name}
               </div>

             ))}

           </div>

    )}
    </div>
  );
}
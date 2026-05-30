

type Props = {
  addCollege: (college: any) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  results: any[];
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function CollegeSearch({addCollege,search,setSearch,results,setResults}: Props) {



  const handleSearch = async (value:string)=>{
      setSearch(value);

      if(!value.trim()) {
        setResults([]);
        return;
      }

      try {
        
        const res= await fetch(`/api/colleges?search=${value}`);

        const data = await res.json();
        setResults(data);
        console.log(data);

      } catch (error) {
        console.log(error);
      }
  };

  return (
    <>
    <input
        type="text"
        placeholder="Search college..."
        value={search}
        onChange={(e) =>
          handleSearch(e.target.value)
        }
        className="w-full border border-slate-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
      />

      {results.length > 0 && (
  <div className="mt-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow">

    {results.map((college: any) => (

      <div
        key={college.id}
        onClick={() => addCollege(college)}
        className="p-3 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
      >
        {college.name}
      </div>

    ))}

     </div>
   )}
    </>
  )
}


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
        className="w-full border border-slate-300 rounded-lg p-3"
      />

      {results.length > 0 && (
  <div className="mt-2 border border-slate-200 rounded-lg bg-white shadow">

    {results.map((college: any) => (

      <div
        key={college.id}
        onClick={() => addCollege(college)}
        className="p-3 hover:bg-slate-100 cursor-pointer"
      >
        {college.name}
      </div>

    ))}

     </div>
   )}
    </>
  )
}
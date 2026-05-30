import DashboardLayout from "@/components/layout/DashboardLayout";
import CollegesList from "@/components/college/CollegesList";
import SearchBar from "@/components/ui/SearchBar";
import Link from "next/link";
import {FaUniversity} from "react-icons/fa";


async function getColleges(search = "",page=1) {
  try {
    const limit=21;

const res = await fetch(
  `http://localhost:3000/api/colleges?search=${search}&page=${page}&limit=${limit}`,
  {
    cache: "no-store",
  }
);

    if (!res.ok) {
      throw new Error(
        `Failed with status ${res.status}`
      );
    }
    
    return await res.json();

  } catch (error) {

    console.error(
      "Error fetching colleges:",
      error
    );

    return [];
  }
}

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?:string }>;
}) {

  const params = await searchParams;

  const page= Number(params.page)||1;

  const colleges = await getColleges(params.search || "",page);

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
         <FaUniversity/> Colleges
        </h1>

        <SearchBar />

        <CollegesList colleges={colleges} />

<div className="flex justify-center gap-4 mt-10">

  {page > 1 && (
    <Link
      href={`/colleges?search=${params.search || ""}&page=${page - 1}`}
      className="px-4 py-2 bg-gray-200 rounded"
    >
      Previous
    </Link>
  )}

  {colleges.length>0 && <Link
    href={`/colleges?search=${params.search || ""}&page=${page + 1}`}
    className="px-4 py-2 bg-blue-600 text-white rounded"
  >
    Next
  </Link>}

</div>
      </div>
    </DashboardLayout>
  );
}
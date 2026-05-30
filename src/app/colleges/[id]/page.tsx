import { College } from "@/types/college";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { notFound } from "next/navigation";
import {FaStar,FaMapMarkerAlt,FaRupeeSign,FaBriefcase,FaUniversity } from "react-icons/fa";
import {LuBookOpen,LuBriefcaseBusiness} from "react-icons/lu";


async function getCollege(id: string): Promise<College | null> {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/colleges/${id}`,
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
      "Error fetching college:",
      error
    );
    return null;
  }
}

export default async function CollegeDetailsPage({ params,}: { params: Promise<{ id: string }>;}) {

  const { id } = await params;

  const college = await getCollege(id);

  if(!college){
       notFound();
  }

  return (
    <DashboardLayout>

      <div className="container-custom py-10">

     <img
       src={college.image}
       alt={college.name}
       className="w-full h-80 object-cover rounded-2xl mb-8"
     />

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-8 shadow-lg">

          <h1 className="text-4xl font-bold">
            {college.name}
          </h1>

          <p className="mt-3 text-lg opacity-90 flex items-center gap-2">
            <FaMapMarkerAlt/> {college.location}
          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-xl shadow-md p-6 border">

            <h3 className="text-slate-500 text-lg flex items-center gap-2">
             <FaRupeeSign size={20}/> Annual Fees
            </h3>

            <p className="text-3xl font-bold mt-2">
              ₹{college.fees}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border">

            <h3 className="text-slate-500 text-lg flex items-center gap-2">
             <FaBriefcase size={20}/> Placement Rate
            </h3>

            <p className="text-3xl font-bold mt-2 text-green-600">
              {college.placementPercentage}%
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border">

            <h3 className="text-slate-500 text-lg flex items-center gap-2">
             <FaStar size={20}/> Rating
            </h3>

            <p className="text-3xl font-bold mt-2 text-yellow-500 flex items-center gap-2">
              <FaStar/> {college.rating}
            </p>

          </div>

        </div>

        {/* Overview Section */}

        <div className="bg-white rounded-xl shadow-md border p-8 mt-8">

          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaUniversity size={30}/> Overview
          </h2>

          <p className="text-slate-600 leading-8">
            {college.about}
          </p>

        </div>

        {/* Courses Section */}

        <div className="bg-white rounded-xl shadow-md border p-8 mt-8">

          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <LuBookOpen size={30}/> Courses Offered
          </h2>

          <p className="text-slate-600 leading-8">
            {college.courses || "Information not available"}
          </p>

        </div>

         {/* Placements Section */}

        <div className="bg-white rounded-xl shadow-md border p-8 mt-8">

          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <LuBriefcaseBusiness size={30}/> Placements
          </h2>

          <p className="text-slate-600 leading-8">
            {college.placements || "Information not available"}
          </p>

        </div>

        {/* Reviews Section */}

        <div className="bg-white rounded-xl shadow-md border p-8 mt-8">

          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaStar size={30}/> Student Reviews
          </h2>

          <p className="text-slate-600 leading-8">
            {college.reviews || "No reviews available"}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}
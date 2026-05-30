import {FaUniversity,FaMapMarkerAlt,FaRupeeSign,FaStar,FaBriefcase} from "react-icons/fa";

type Props = {
  compareData: any[];
};

export default function CompareTable({compareData}:Props) {

return (

  <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">

    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-5">

      <h2 className="text-2xl font-bold">
        College Comparison
      </h2>

    </div>

    <div className="overflow-x-auto">

      <table className="w-full">

        <tbody>

          {/* Name */}

          <tr className="border-b border-slate-200 dark:border-slate-700">

            <td className="font-semibold p-4 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 flex items-center gap-2">
             <FaUniversity/> College
            </td>

            {compareData.map((college:any) => (
              <td
                key={college.id}
                className="p-4 text-center font-bold text-slate-900 dark:text-slate-100"
              >
                {college.name}
              </td>
            ))}

          </tr>

          {/* Location */}

          <tr className="border-b border-slate-200 dark:border-slate-700">

            <td className="font-semibold p-4 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FaMapMarkerAlt/> Location
            </td>

            {compareData.map((college:any) => (
              <td
                key={college.id}
                className="p-4 text-center text-slate-700 dark:text-slate-300"
              >
                {college.location}
              </td>
            ))}

          </tr>

          {/* Fees */}

          <tr className="border-b border-slate-200 dark:border-slate-700">

            <td className="font-semibold p-4 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 flex items-center gap-2">
             <FaRupeeSign/> Fees
            </td>

            {compareData.map((college:any) => (
              <td
                key={college.id}
                className="p-4 text-center text-slate-700 dark:text-slate-300"
              >
                ₹{college.fees}
              </td>
            ))}

          </tr>

          {/*Placement percentage*/}
          <tr className="border-b border-slate-200 dark:border-slate-700">

            <td className="font-semibold p-4 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 flex items-center gap-2">
             <FaBriefcase/>  Placement Percentage
            </td>

            {compareData.map((college:any) => (
              <td
                key={college.id}
                className="p-4 text-center text-slate-700 dark:text-slate-300"
              >
                {college.placementPercentage}%
              </td>
            ))}

          </tr>


          {/* Rating */}

          <tr>

            <td className="font-semibold p-4 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 flex items-center gap-2">
             <FaStar/> Rating
            </td>

            {compareData.map((college:any) => (
              <td
                key={college.id}
                className="p-4"
              >
                <div className="flex items-center justify-center gap-2">
                <FaStar className="text-yellow-500" /> {college.rating}
                </div>
              </td>
            ))}

          </tr>

        </tbody>

      </table>

    </div>

  </div>

)
}
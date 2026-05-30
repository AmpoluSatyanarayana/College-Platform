import {FaUniversity,FaMapMarkerAlt,FaRupeeSign,FaStar,FaBriefcase} from "react-icons/fa";

type Props = {
  compareData: any[];
};

export default function CompareTable({compareData}:Props) {

return (

  <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">

    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 sm:p-5">

      <h2 className="text-xl sm:text-2xl font-bold">
        College Comparison
      </h2>

    </div>

    <div className="overflow-x-auto">

      <table className="w-full min-w-[560px] text-sm sm:text-base">

        <tbody>

          {/* Name */}

          <tr className="border-b border-slate-200 dark:border-slate-700">

            <td className="font-semibold p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 align-middle whitespace-nowrap min-w-[140px]">
             <span className="inline-flex items-center gap-2"><FaUniversity/> College</span>
            </td>

            {compareData.map((college:any) => (
              <td
                key={college.id}
                className="p-3 sm:p-4 text-center font-bold text-slate-900 dark:text-slate-100 min-w-[120px]"
              >
                {college.name}
              </td>
            ))}

          </tr>

          {/* Location */}

          <tr className="border-b border-slate-200 dark:border-slate-700">

            <td className="font-semibold p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 align-middle whitespace-nowrap min-w-[140px]">
              <span className="inline-flex items-center gap-2"><FaMapMarkerAlt/> Location</span>
            </td>

            {compareData.map((college:any) => (
              <td
                key={college.id}
                className="p-3 sm:p-4 text-center text-slate-700 dark:text-slate-300 min-w-[100px]"
              >
                {college.location}
              </td>
            ))}

          </tr>

          {/* Fees */}

          <tr className="border-b border-slate-200 dark:border-slate-700">

            <td className="font-semibold p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 align-middle whitespace-nowrap min-w-[140px]">
             <span className="inline-flex items-center gap-2"><FaRupeeSign/> Fees</span>
            </td>

            {compareData.map((college:any) => (
              <td
                key={college.id}
                className="p-3 sm:p-4 text-center text-slate-700 dark:text-slate-300 min-w-[100px]"
              >
                ₹{college.fees}
              </td>
            ))}

          </tr>

          {/*Placement percentage*/}
          <tr className="border-b border-slate-200 dark:border-slate-700">

            <td className="font-semibold p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 align-middle min-w-[140px]">
             <span className="inline-flex items-center gap-2"><FaBriefcase/> Placement %</span>
            </td>

            {compareData.map((college:any) => (
              <td
                key={college.id}
                className="p-3 sm:p-4 text-center text-slate-700 dark:text-slate-300 min-w-[100px]"
              >
                {college.placementPercentage}%
              </td>
            ))}

          </tr>


          {/* Rating */}

          <tr>

            <td className="font-semibold p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 align-middle whitespace-nowrap min-w-[140px]">
             <span className="inline-flex items-center gap-2"><FaStar/> Rating</span>
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
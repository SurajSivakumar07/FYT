import { useState } from "react";

import gym_logo from "../assets/gym_logo.png";
import { Download, Building2, Mail, FileText } from "lucide-react";
import {
  useDownloadMonthlyExcel,
  useYearlyStatement,
  useGymData,
} from "../hooks/gyms/useGymData";
import { useRole } from "../hooks/role/useRole";
import { useUserStore } from "../zustand/store";

const SettingsPage = () => {
  const { data, isLoading } = useGymData();
  const [settings, setSettings] = useState({
    gymName: "Extreme Fitness",
    email: "extreme.fitness.ttc.6725@gmail.com",

    invoicePrefix: "XT",
    logo: "https://via.placeholder.com/120x120.png?text=LOGO",
    address: "The Turf City, Teacher's colony, Karamadai-641104",
    establishedYear: "2025",
  });

  const [editMode, setEditMode] = useState(false);
  const user = useUserStore((state) => state.user);

  const [tempSettings, setTempSettings] = useState(settings);

  const { refetch, isFetching } = useYearlyStatement();
  const { refetch: monthlyRefetch, isLoading: loadingMonthly } =
    useDownloadMonthlyExcel();

  const handleDownloadYearlyReport = async () => {
    try {
      const { data } = await refetch();

      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `annual_report_${new Date().getFullYear()}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download the annual report.");
    }
  };
  const handleDownloadMonthlyReport = async () => {
    try {
      const { data } = await monthlyRefetch();

      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `monthly_report_${new Date().getFullYear()}_${
          new Date().getMonth() + 1
        }.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download the monthly report.");
    }
  };
  return (
    // <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
    //   <div className="max-w-5xl mx-auto">
    //     {/* Header */}

    //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    //       {/* Logo Section */}
    //       <div className="lg:col-span-1">
    //         <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
    //           <div className="flex flex-col items-center space-y-4">
    //             <div className="relative">
    //               <img
    //                 src={gym_logo}
    //                 alt="Gym Logo"
    //                 className="w-32 h-32 object-cover rounded-2xl border-4 border-green-100 shadow-lg"
    //               />
    //               {editMode && (
    //                 <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
    //                   <span className="text-white text-sm font-medium">
    //                     Change Logo
    //                   </span>
    //                 </div>
    //               )}
    //             </div>
    //             {editMode && (
    //               <input
    //                 type="url"
    //                 value={data.gym_photo}
    //                 onChange={(e) => handleInputChange("logo", e.target.value)}
    //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 placeholder="Logo URL"
    //               />
    //             )}
    //             <div className="text-center">
    //               <p className="text-sm text-gray-600"></p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Settings Cards */}
    //       <div className="lg:col-span-2">
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           {/* Gym Name */}
    //           <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    //             <div className="flex items-start space-x-3">
    //               <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
    //                 <Building2 className="w-5 h-5 text-purple-600" />
    //               </div>
    //               <div className="flex-1">
    //                 <h3 className="text-sm font-medium text-gray-500 mb-1">
    //                   Gym Name
    //                 </h3>
    //                 {editMode ? (
    //                   <input
    //                     type="text"
    //                     value={tempSettings.gymName}
    //                     onChange={(e) =>
    //                       handleInputChange("gymName", e.target.value)
    //                     }
    //                     className="w-full text-xl font-semibold text-gray-800 border-b-2 border-gray-200 focus:border-blue-500 outline-none bg-transparent"
    //                   />
    //                 ) : (
    //                   <p className="text-xl font-semibold text-gray-800">
    //                     {data?.name}
    //                   </p>
    //                 )}
    //               </div>
    //             </div>
    //           </div>

    //           {/* Email */}
    //           <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    //             <div className="flex items-start space-x-3">
    //               <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
    //                 <Mail className="w-5 h-5 text-blue-600" />
    //               </div>
    //               <div className="flex-1">
    //                 <h3 className="text-sm font-medium text-gray-500 mb-1">
    //                   Business Email
    //                 </h3>
    //                 {editMode ? (
    //                   <input
    //                     type="email"
    //                     value={tempSettings.email}
    //                     onChange={(e) =>
    //                       handleInputChange("email", e.target.value)
    //                     }
    //                     className="w-full text-lg font-medium text-gray-800 border-b-2 border-gray-200 focus:border-blue-500 outline-none bg-transparent"
    //                   />
    //                 ) : (
    //                   <p className="text-sm font-medium text-gray-800 break-all">
    //                     {data?.email}
    //                   </p>
    //                 )}
    //               </div>
    //             </div>
    //           </div>

    //           {/* Phone */}

    //           {/* Invoice Prefix */}
    //           <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    //             <div className="flex items-start space-x-3">
    //               <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg">
    //                 <FileText className="w-5 h-5 text-orange-600" />
    //               </div>
    //               <div className="flex-1">
    //                 <h3 className="text-sm font-medium text-gray-500 mb-1">
    //                   Gym Prefix
    //                 </h3>
    //                 {editMode ? (
    //                   <input
    //                     type="text"
    //                     value={tempSettings.invoicePrefix}
    //                     onChange={(e) =>
    //                       handleInputChange("invoicePrefix", e.target.value)
    //                     }
    //                     className="w-full text-lg font-medium text-gray-800 border-b-2 border-gray-200 focus:border-blue-500 outline-none bg-transparent"
    //                   />
    //                 ) : (
    //                   <p className="text-lg font-medium text-gray-800">
    //                     {data?.gym_prefix}
    //                   </p>
    //                 )}
    //               </div>
    //             </div>
    //           </div>

    //           {/* Address - Full Width */}
    //           <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    //             <div className="flex items-start space-x-3">
    //               <div className="p-2 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
    //                 <Building2 className="w-5 h-5 text-red-600" />
    //               </div>
    //               <div className="flex-1">
    //                 <h3 className="text-sm font-medium text-gray-500 mb-1">
    //                   Address
    //                 </h3>
    //                 {editMode ? (
    //                   <textarea
    //                     value={tempSettings.address}
    //                     onChange={(e) =>
    //                       handleInputChange("address", e.target.value)
    //                     }
    //                     className="w-full text-lg font-medium text-gray-800 border-b-2 border-gray-200 focus:border-blue-500 outline-none bg-transparent resize-none"
    //                     rows="2"
    //                   />
    //                 ) : (
    //                   <p className="text-lg font-medium text-gray-800">
    //                     {data?.address}
    //                   </p>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Reports Section */}

    //     {user?.role === "owner" && (
    //       <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
    //         <h3 className="text-xl font-semibold text-gray-800 mb-4">
    //           Reports & Analytics
    //         </h3>
    //         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
    //           <div>
    //             <p className="text-gray-600 mb-2">
    //               Download comprehensive transaction reports for analysis
    //             </p>
    //           </div>
    //           <button
    //             onClick={handleDownloadYearlyReport}
    //             disabled={isFetching}
    //             className="flex items-center space-x-3 bg-gradient-to-r bg-black text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
    //           >
    //             <Download
    //               className={`w-5 h-5 ${isFetching ? "animate-bounce" : ""}`}
    //             />
    //             <span className="font-medium">
    //               {isFetching
    //                 ? "Generating Report..."
    //                 : "Download Yearly Report"}
    //             </span>
    //           </button>
    //           <button
    //             onClick={handleDownloadMonthlyReport}
    //             disabled={loadingMonthly}
    //             className="flex items-center space-x-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
    //           >
    //             <Download
    //               className={`w-5 h-5 ${
    //                 loadingMonthly ? "animate-bounce" : ""
    //               }`}
    //             />
    //             <span className="font-medium">
    //               {loadingMonthly
    //                 ? "Generating Report..."
    //                 : "Download Monthly Report"}
    //             </span>
    //           </button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Premium Header */}
        <div className="border-b border-gray-100 pb-8 mb-12">
          <h1 className="text-4xl font-light text-black tracking-tight mb-2">
            Settings
          </h1>
          <p className="text-gray-600 font-light text-lg">
            Manage your gym configuration and download reports
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Premium Logo Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 p-8 h-fit">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative group">
                  <img
                    src={gym_logo}
                    alt="Gym Logo"
                    className="w-40 h-40 object-cover border border-gray-200 transition-all duration-300 group-hover:border-black"
                  />
                  {editMode && (
                    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white text-sm font-medium tracking-wide">
                        CHANGE LOGO
                      </span>
                    </div>
                  )}
                </div>
                {editMode && (
                  <input
                    type="url"
                    value={data?.gym_photo || ""}
                    onChange={(e) => handleInputChange("logo", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-black"
                    placeholder="Logo URL"
                  />
                )}
                <div className="text-center">
                  <p className="text-xs text-gray-500 font-light tracking-wider uppercase">
                    Brand Identity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Settings Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gym Name */}
              <div className="bg-white border border-gray-100 p-8 hover:border-gray-300 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-medium text-gray-500 mb-3 tracking-wider uppercase">
                      Gym Name
                    </h3>
                    {editMode ? (
                      <input
                        type="text"
                        value={tempSettings.gymName}
                        onChange={(e) =>
                          handleInputChange("gymName", e.target.value)
                        }
                        className="w-full text-2xl font-light text-black border-b border-gray-200 focus:border-black outline-none bg-transparent pb-2"
                      />
                    ) : (
                      <p className="text-2xl font-light text-black tracking-tight">
                        {data?.name || settings.gymName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white border border-gray-100 p-8 hover:border-gray-300 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-medium text-gray-500 mb-3 tracking-wider uppercase">
                      Business Email
                    </h3>
                    {editMode ? (
                      <input
                        type="email"
                        value={tempSettings.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full text-lg font-light text-black border-b border-gray-200 focus:border-black outline-none bg-transparent pb-2"
                      />
                    ) : (
                      <p className="text-lg font-light text-black break-all">
                        {data?.email || settings.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Invoice Prefix */}
              <div className="bg-white border border-gray-100 p-8 hover:border-gray-300 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-medium text-gray-500 mb-3 tracking-wider uppercase">
                      Gym Prefix
                    </h3>
                    {editMode ? (
                      <input
                        type="text"
                        value={tempSettings.invoicePrefix}
                        onChange={(e) =>
                          handleInputChange("invoicePrefix", e.target.value)
                        }
                        className="w-full text-xl font-light text-black border-b border-gray-200 focus:border-black outline-none bg-transparent pb-2"
                      />
                    ) : (
                      <p className="text-xl font-light text-black tracking-wide">
                        {data?.gym_prefix || settings.invoicePrefix}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address - Full Width */}
              <div className="md:col-span-1 bg-white border border-gray-100 p-8 hover:border-gray-300 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-medium text-gray-500 mb-3 tracking-wider uppercase">
                      Address
                    </h3>
                    {editMode ? (
                      <textarea
                        value={tempSettings.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className="w-full text-lg font-light text-black border-b border-gray-200 focus:border-black outline-none bg-transparent resize-none pb-2"
                        rows="3"
                      />
                    ) : (
                      <p className="text-lg font-light text-black leading-relaxed">
                        {data?.address || settings.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Reports Section */}
        {user?.role === "owner" && (
          <div className="mt-16 bg-white border border-gray-100 p-10">
            <div className="border-b border-gray-100 pb-6 mb-8">
              <h3 className="text-3xl font-light text-black tracking-tight mb-2">
                Reports & Analytics
              </h3>
              <p className="text-gray-600 font-light text-lg">
                Download comprehensive transaction reports for business analysis
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-black mb-1">
                      Yearly Report
                    </h4>
                    <p className="text-gray-600 font-light">
                      Complete annual transaction summary and financial overview
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-black mb-1">
                      Monthly Report
                    </h4>
                    <p className="text-gray-600 font-light">
                      Current month's detailed transaction breakdown
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleDownloadYearlyReport}
                  disabled={isFetching}
                  className="flex items-center justify-center space-x-3 bg-black text-white px-8 py-4 hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] min-w-[200px]"
                >
                  <Download
                    className={`w-5 h-5 ${isFetching ? "animate-spin" : ""}`}
                  />
                  <span className="font-medium tracking-wide">
                    {isFetching ? "GENERATING..." : "YEARLY REPORT"}
                  </span>
                </button>

                <button
                  onClick={handleDownloadMonthlyReport}
                  disabled={loadingMonthly}
                  className="flex items-center justify-center space-x-3 bg-white border-2 border-black text-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] min-w-[200px]"
                >
                  <Download
                    className={`w-5 h-5 ${
                      loadingMonthly ? "animate-spin" : ""
                    }`}
                  />
                  <span className="font-medium tracking-wide">
                    {loadingMonthly ? "GENERATING..." : "MONTHLY REPORT"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Edit Mode Button for Demo */}
        <div className="mt-8 flex justify-center">
          {/* <button
            onClick={() => setEditMode(!editMode)}
            className="px-6 py-3 bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 transition-colors"
          >
            {editMode ? "Cancel Edit" : "Edit Settings"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ProfilePage() {

  const { user, loading } = useAuth();

  const [savedCount, setSavedCount] =
    useState(0);

  useEffect(() => {

    const getSavedCount = async () => {

      try {

        const res = await fetch(
          "/api/saved"
        );

        const data = await res.json();

        setSavedCount(
          data.savedCollege.length
        );

      } catch (error) {

        console.log(error);

      }

    };

    getSavedCount();

  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (

    <DashboardLayout>

      <div className="max-w-3xl mx-auto py-10">

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 p-8">

          <div className="flex items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">

              {user?.name
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {user?.name}
              </h1>

              <p className="text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            <div className="border border-slate-200 dark:border-slate-600 rounded-xl p-6">

              <h3 className="text-slate-500 dark:text-slate-400">
                Saved Colleges
              </h3>

              <p className="text-4xl font-bold text-blue-600 mt-2">
                {savedCount}
              </p>

            </div>

            <div className="border border-slate-200 dark:border-slate-600 rounded-xl p-6">

              <h3 className="text-slate-500 dark:text-slate-400">
                Account Status
              </h3>

              <p className="text-2xl font-semibold text-green-600 mt-2">
                Active
              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );
}
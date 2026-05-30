"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();

  const { updateUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Registration failed"
        );
      }

      updateUser(data.user);

      router.push("/");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-slate-100">
          Create Account
        </h1>

        <p className="text-center text-slate-500 dark:text-slate-400 mt-2">
          Join CollegeFinder today
        </p>

        {error && (
          <p className="mt-4 text-red-500 text-center">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

      </div>

    </div>
  );
}
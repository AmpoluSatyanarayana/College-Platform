"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MdWavingHand } from "react-icons/md";
import PasswordInput from "@/components/ui/PasswordInput";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const {updateUser}= useAuth();

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
        "/api/auth/login",
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
          data.error || "Login failed"
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

      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-transparent dark:border-slate-700">

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2 justify-center">
          Welcome Back <MdWavingHand className="text-yellow-500"/>
        </h1>

        <p className="text-center text-slate-500 dark:text-slate-400 mt-2">
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
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
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
              Password
            </label>

            <PasswordInput
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-medium"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}
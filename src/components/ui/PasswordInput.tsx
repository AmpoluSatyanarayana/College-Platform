"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function PasswordInput({
  name,
  value,
  onChange,
  placeholder,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 pr-12 outline-none focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
      >
        {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  FaUser,
  FaChartBar,
  FaHome,
  FaSignOutAlt,
  FaBookmark,
  FaUniversity,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinkClass =
  "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-2";

const sidebarLinkClass =
  "flex w-full items-center gap-3 rounded-xl px-5 py-4 text-base font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition";

export default function Navbar() {
  const { user, clearUser } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const profileRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!user;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    clearUser();
    closeMobileMenu();
    router.refresh();
    router.push("/");
  };

  return (
    <>
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700">
      <div className="container-custom h-14 sm:h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-yellow-400 flex items-center justify-center font-bold text-slate-900">
            C
          </div>

          <span className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
            CollegeFinder
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <ThemeToggle />

          <Link href="/" className={navLinkClass}>
            <FaHome /> Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/colleges" className={navLinkClass}>
                <FaUniversity />
                Colleges
              </Link>

              <Link href="/compare" className={navLinkClass}>
                <FaChartBar /> Compare
              </Link>

              <Link href="/saved" className={navLinkClass}>
                <FaBookmark /> Saved
              </Link>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 xl:gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <span className="font-medium text-slate-900 dark:text-slate-100 max-w-[120px] truncate hidden xl:inline">
                    {user?.name}
                  </span>
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {user?.name}
                      </p>

                      <p className="text-sm text-slate-500 dark:text-slate-400 break-all">
                        {user?.email}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/saved"
                        className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                      >
                        <FaBookmark /> Saved Colleges
                      </Link>

                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                      >
                        <FaUser /> My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-block text-center px-4 xl:px-5 py-2 text-white bg-blue-500 rounded-md font-medium hover:bg-blue-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 xl:px-5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <FaBars size={22} />
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile sidebar — outside nav so it is not clipped */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        <aside
          className={`absolute top-0 right-0 h-full w-[min(100vw,20rem)] sm:w-80 bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-700 flex flex-col transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between px-5 py-5 border-b border-slate-200 dark:border-slate-700">
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Menu
            </span>

            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="p-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <FaTimes size={22} />
            </button>
          </div>

          <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-5 space-y-2">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={sidebarLinkClass}
            >
              <FaHome size={20} className="shrink-0" /> Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/colleges"
                  onClick={closeMobileMenu}
                  className={sidebarLinkClass}
                >
                  <FaUniversity size={20} className="shrink-0" /> Colleges
                </Link>

                <Link
                  href="/compare"
                  onClick={closeMobileMenu}
                  className={sidebarLinkClass}
                >
                  <FaChartBar size={20} className="shrink-0" /> Compare
                </Link>

                <Link
                  href="/saved"
                  onClick={closeMobileMenu}
                  className={sidebarLinkClass}
                >
                  <FaBookmark size={20} className="shrink-0" /> Saved Colleges
                </Link>

                <div className="my-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 px-5 py-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {user?.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={closeMobileMenu}
                  className={sidebarLinkClass}
                >
                  <FaUser size={20} className="shrink-0" /> My Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${sidebarLinkClass} text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50`}
                >
                  <FaSignOutAlt size={20} className="shrink-0" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className={`${sidebarLinkClass} justify-center bg-blue-600 text-white hover:bg-blue-700 hover:text-white mt-2`}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className={`${sidebarLinkClass} justify-center border-2 border-slate-300 dark:border-slate-600`}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </aside>
      </div>
    </>
  );
}

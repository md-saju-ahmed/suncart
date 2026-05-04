"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import DefaultAvatar from "@/assets/default-avatar.png";
import NavLinks from "./NavLinks";
import Container from "./Container";
import { authClient } from "@/lib/auth-client";
import { FaBars } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <Container>
        <div className="navbar px-0 py-4">

          {/* Left */}
          <div className="navbar-start gap-2">
            <div className="dropdown lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle hover:bg-neutral-100"
              >
                <FaBars className="text-xl" />
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-25 w-64 rounded-2xl border border-neutral-100 bg-white p-4 shadow-xl"
              >
                <NavLinks />

                <div className="mt-4 border-t border-neutral-100 pt-4">
                  {isPending ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Skeleton circle height={40} width={40} />
                        <div className="flex-1">
                          <Skeleton height={12} width={120} />
                          <Skeleton height={10} width={160} />
                        </div>
                      </div>

                      <Skeleton height={40} borderRadius={999} />
                    </div>
                  ) : user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-2">
                        <Image
                          src={user?.image || DefaultAvatar}
                          alt="User Avatar"
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />

                        <div>
                          <p className="text-sm font-semibold text-neutral-900">
                            {user?.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="btn btn-neutral w-full rounded-full"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link href="/login">
                        <button className="btn btn-ghost w-full rounded-full">
                          Login
                        </button>
                      </Link>

                      <Link href="/register">
                        <button className="btn btn-neutral w-full rounded-full">
                          Register
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </ul>
            </div>

            <Link
              href="/"
              className="transition-opacity duration-300 hover:opacity-80"
            >
              <Image
                src={Logo}
                alt="SunCart Logo"
                width={100}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-8">
              <NavLinks />
            </ul>
          </div>

          {/* Right */}
          <div className="navbar-end gap-3">
            {isPending ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block">
                  <Skeleton height={12} width={100} />
                  <Skeleton height={10} width={140} />
                </div>

                <Skeleton circle height={44} width={44} />

                <div className="hidden sm:block">
                  <Skeleton height={40} width={100} borderRadius={999} />
                </div>
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <p className="text-sm text-neutral-900">
                    Hello, {user?.name}
                  </p>
                </div>

                <Image
                  src={user?.image || DefaultAvatar}
                  alt="User Avatar"
                  width={42}
                  height={42}
                  className="h-11 w-11 rounded-full border border-neutral-200 object-cover"
                />

                <button
                  onClick={handleLogout}
                  className="btn btn-neutral hidden sm:flex rounded-full px-5 shadow-none"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <button className="btn btn-ghost rounded-full px-5 font-medium hover:bg-neutral-100">
                    Login
                  </button>
                </Link>

                <Link href="/register">
                  <button className="btn btn-neutral rounded-full px-6 font-medium shadow-none">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
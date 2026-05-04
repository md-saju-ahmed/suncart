"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiEdit2,
  FiMail,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import Container from "@/components/shared/Container";
import DefaultAvatar from "@/assets/default-avatar.png";
import { authClient } from "@/lib/auth-client";
import LoadingPage from "../loading";

const MyProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  if (isPending) {
    return (
      <section className="bg-neutral-50/50 py-10 lg:py-16 animate__animated animate__fadeIn">
        <Container>
          <LoadingPage />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 lg:py-16 animate__animated animate__fadeIn">
      <Container>
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-100 bg-slate-50/30 p-6 sm:p-8 lg:p-10 animate__animated animate__fadeInUp">

          <div className="flex flex-col items-center text-center">

            {/* Avatar */}
            <div className="relative animate__animated animate__zoomIn">
              <Image
                src={user?.image || DefaultAvatar}
                alt="User Avatar"
                width={120}
                height={120}
                className="h-28 w-28 rounded-full border-4 border-neutral-100 object-cover"
              />
            </div>

            <h1 className="mt-5 text-3xl font-semibold text-neutral-900 animate__animated animate__fadeInDown">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-neutral-500 animate__animated animate__fadeIn">
              Manage your personal information and account details.
            </p>
          </div>

          {/* Profile Information */}
          <div className="mt-10 space-y-5">

            <div className="rounded-2xl border border-neutral-100 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
                  <FiUser className="text-lg text-neutral-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    Full Name
                  </p>
                  <h3 className="text-base text-neutral-900">
                    {user?.name || "No name found"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-100 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
                  <FiMail className="text-lg text-neutral-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    Email Address
                  </p>
                  <h3 className="text-base text-neutral-900 break-all">
                    {user?.email}
                  </h3>
                </div>
              </div>
            </div>

          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link href="/my-profile/update-profile">
              <button className="btn btn-neutral rounded-full px-8 shadow-none">
                <FiEdit2 />
                Update Information
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-outline rounded-full px-8"
            >
              <FiLogOut />
              Logout
            </button>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default MyProfilePage;
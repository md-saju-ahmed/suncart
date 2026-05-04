"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Container from "@/components/shared/Container";
import DefaultAvatar from "@/assets/default-avatar.png";
import { authClient } from "@/lib/auth-client";
import LoadingPage from "@/app/loading";
import { toast } from "react-toastify";

const UpdateProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState(() => user?.name || "");
  const [image, setImage] = useState(() => user?.image || "");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await authClient.updateUser({ name, image });
      await authClient.getSession();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
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
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-100 bg-slate-50/30 p-6 sm:p-8 lg:p-10 animate__animated animate__fadeInUp">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-neutral-900">
                Update Profile
              </h1>
              <p className="mt-2 text-sm text-neutral-500">
                Update your profile information and avatar.
              </p>
            </div>
            <Link
              href="/my-profile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 transition hover:bg-neutral-100 animate__animated animate__zoomIn"
            >
              <FiArrowLeft className="text-lg" />
            </Link>
          </div>

          {/* Avatar */}
          <div className="mt-10 flex justify-center animate__animated animate__zoomIn">
            <Image
              src={image || user?.image || DefaultAvatar}
              alt="Profile Preview"
              width={120}
              height={120}
              className="h-28 w-28 rounded-full border-4 border-neutral-100 object-cover"
            />
          </div>

          {/* Form */}
          <form
            onSubmit={handleUpdateProfile}
            className="mt-10 space-y-5 animate__animated animate__fadeInUp"
          >
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered h-11 w-full rounded-2xl border-neutral-200 bg-white focus:outline-none"
              />
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Profile Image URL
              </label>
              <input
                type="text"
                placeholder="Paste your image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input input-bordered h-11 w-full rounded-2xl border-neutral-200 bg-white focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="input input-bordered h-11 w-full rounded-2xl border-neutral-200 bg-neutral-100 text-neutral-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-neutral mt-4 w-full rounded-full shadow-none"
            >
              Update Information
            </button>
          </form>

        </div>
      </Container>
    </section>
  );
};

export default UpdateProfilePage;
"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import SignOutButton from "./sign-out-button";
import React from "react";

/**
 *
 * @constructor
 */
export default function AccountInfo() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (user) {
    return (
      <>
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl font-bold mb-2">MY ACCOUNT</h1>
        <p className="text-xl mb-12">Welcome {user.displayName}!</p>
        <p className="text-lg mb-12">
          MANAGE YOUR PROFILE AND SAVED QUERIES HERE.
        </p>

        {/* Profile Information Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-medium">Name:</span>
              <span>{user.displayName}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Email Address:</span>
              <span>{user.email}</span>
            </div>
          </div>
          <div className="pt-4">
            <SignOutButton />
          </div>
        </section>
      </>
    );
  }

  return <p>No user is signed in.</p>;
}

'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebaseConfig';

export function AccountInfo() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (user) {
    return (

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
    );
  }

  return <p>No user is signed in.</p>;
}
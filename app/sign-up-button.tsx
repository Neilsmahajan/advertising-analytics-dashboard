"use client";

import { Button } from "@/components/ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";

export default function SignUpButton() {
  const [user] = useAuthState(auth);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
  };

  const handleRedirect = () => {
    router.push("/account");
  };

  return (
    <Button
      size="lg"
      variant="default"
      className="text-white bg-[#0077be] hover:bg-[#005f9e]"
      onClick={user ? handleRedirect : handleSignIn}
    >
      {user ? "VIEW YOUR QUERIES" : "SIGN UP FOR FREE"}
    </Button>
  );
}

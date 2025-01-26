'use client';

import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebaseConfig'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out: ', error)
    }
  }

  return (
    <Button
      variant="secondary"
      className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white"
      onClick={handleSignOut}
    >
      SIGN OUT
    </Button>
  )
}

"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const Logout = async () => {
    await signOut()
    const { status } = useSession();
    router.push('/sign-in')
  }
  return (
    <>
      {status === "authenticated" ? (
        <>
          <Link href="/edit-article" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={() => Logout()}>
            Logout
          </span>
        </>
      ) : (
        <Link href="/sign-in" className={styles.link}>
          Login
        </Link>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex md:hidden " size="icon">
            <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              Write
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>LogOut</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AuthLinks;

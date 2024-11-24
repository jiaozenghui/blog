"use client";

import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react"
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react";

type CardProps = React.ComponentProps<typeof Card>;

export function HeaderActions({ className, ...props }: CardProps) {

  const { status } = useSession();
  const Delete = async () => {
    console.log('delete')
  }
  return (
    <>
      {status === "authenticated" ? (
        <>
          <div className="flex items-center space-x-1 rounded-md ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4" >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span onClick={() => Delete()}>
                    Delete
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/edit-article" >
                    Write
                  </Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <></>
      )}

    </>
  );
}

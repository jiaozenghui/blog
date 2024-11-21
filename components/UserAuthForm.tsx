"use client";

import * as React from "react";
import { signIn, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const formSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    })
  })
  const form = useForm()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
    })
    if (result?.error) {
        console.log('result', result);
        if (result.error === 'CredentialsSignin') {
            message.error('邮箱或密码不正确')
        } else {
            message.error(result.error || '登录失败')
        }
    } else {
        Notification({
            type: 'success',
            message: '登录成功!',
            placement: 'top'
        })
        router.push('/')
    }
  }

  return (

<Card className={cn("w-full", className)} {...props}>
<CardHeader>
  {/* <CardTitle className="text-xl">Sign In</CardTitle>
  <CardDescription>
    Enter your information to login in
  </CardDescription> */}
</CardHeader>
<CardContent className="p-6 pt-0 grid gap-4">
  <form onSubmit={onSubmit}  >
    <div className="grid gap-2">
      <div className="grid gap-1">
        <Label htmlFor="Email" className="text-lg	 mb-1">Email</Label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password" className="text-lg">Password</Label>
        <Input id="password" type="password" />
      </div>
      <Button disabled={isLoading}>
        {isLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Sign In with Email
      </Button>
    </div>
  </form>
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-background px-2 text-muted-foreground">
        Or continue with
      </span>
    </div>
  </div>
  <Button variant="outline" type="button" disabled={isLoading}>
    {isLoading ? (
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    ) : (
      <Icons.gitHub className="mr-2 h-4 w-4" />
    )}{" "}
    GitHub
  </Button>
</CardContent>
</Card>

  )
}


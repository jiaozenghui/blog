"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Local } from "@/plugin/storage";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)


  const { toast } = useToast()
  const { status, data: session } = useSession();
  const router = useRouter();

  const [accessToken, setAccessToken] = React.useState(null);
  console.log('test666666666666666666666666')
  React.useEffect(() => {
    if (session) {
      console.log(session)
    }
  }, [session]);

  if (status === "authenticated") {
    router.push("/")
  }
  const formSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    })
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    })
    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: '邮箱或密码不正确',
        })
      } else {
        toast({
          title: result.error || '登录失败',
        })
      }
    } else {
      Local.set('token', session?.accessToken)
      toast({
        title: '登录成功!'
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}  >
            <div className="grid gap-2">
              <div className="grid gap-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2.5">
                      <FormLabel className="text-16 font-bold  ">Email</FormLabel>
                      <FormControl>
                        <Input type="email" disabled={isLoading} className="input-class focus-visible:ring-offset-orange-1" placeholder="eamial" {...field} />
                      </FormControl>
                      <FormMessage className=" " />
                    </FormItem>
                  )}
                />

              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2.5">
                      <FormLabel className="text-16 font-bold  ">Password</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} className="input-class focus-visible:ring-offset-orange-1" placeholder="password" {...field} />
                      </FormControl>
                      <FormMessage className=" " />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
        </Form>
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


"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useState, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
// import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
// import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import LoaderSpinner from '@/components/LoaderSpinner';
import axios from "axios";
import { articleListItemType } from "@/types/article";
import { Result } from 'antd';
import { authOptions, getAuthSession } from "@/utils/auth";

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status: UploadStatus
  raw: File
  resp?: any
  // 上传为图书时候的预览地址
  url?: string
}

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];

const formSchema = z.object({
  title: z.string().min(2),
  desc: z.string().min(2)
})

const AIEditor = dynamic(() => import("@/components/AIEditor"), {
  ssr: false,
  loading: () => <LoaderSpinner />,
});


const CreatePodcast = () => {
  const { status, data } = useSession();
  const sessionData = data
  const router = useRouter()

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageUrl, setImageUrl] = useState('');


  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioDuration, setAudioDuration] = useState(0);

  const [voicePrompt, setVoicePrompt] = useState('');

  const [content, setContent] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // const createPodcast = useMutation(api.podcasts.createPodcast)

  const imageRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
    },
  })


  if (status === 'unauthenticated') {
    return router.push("/");
  }
  if (status === 'loading') { return <LoaderSpinner /> }






  async function onSubmit(data: z.infer<typeof formSchema>) {

    debugger
    try {
      setIsSubmitting(true);
      // if (!imageUrl) {
      //   toast({
      //     title: 'Please generate image',
      //   })
      //   setIsSubmitting(false);
      //   throw new Error('Please generate image')
      // }

      const results = await axios.post('/api/articles/create', {
        title: data.title,
        desc: data.desc,
        coverImg: imageUrl,
        content: content
      }, {
        headers: {
          Authorization: `Bearer ${sessionData?.accessToken}`,
        },
      })
      if (results && results.data) {
        toast({ title: 'Podcast created' })
        setIsSubmitting(false);
        router.push('/')
      }

    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        variant: 'destructive',
      })
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold  ">Create Podcast</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold  ">Title</FormLabel>
                  <FormControl>
                    <Input className="input-class focus-visible:ring-offset-orange-1" placeholder="JSM Pro Podcast" {...field} />
                  </FormControl>
                  <FormMessage className=" " />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold  ">Description</FormLabel>
                  <FormControl>
                    <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write a short podcast description" {...field} />
                  </FormControl>
                  <FormMessage className=" " />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold  ">
                CoverImg
              </Label>

              <GenerateThumbnail
                setImage={setImageUrl}
                setImageStorageId={setImageStorageId}
                image={imageUrl}
                imagePrompt={imagePrompt}
                setImagePrompt={setImagePrompt}
              />
            </div>

          </div>
          <div className="flex flex-col pt-10">
            <AIEditor
              placeholder="描述代码的作用，支持 Markdown 语法.."
              style={{ height: 220 }}
              value={content}
              onChange={(val) => setContent(val)}
            />

            {/* <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType!}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />

            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            /> */}



            <div className="mt-10 w-full">
              <Button type="submit" >
                {isSubmitting ? (
                  <>
                    Generating
                    <Loader size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default CreatePodcast
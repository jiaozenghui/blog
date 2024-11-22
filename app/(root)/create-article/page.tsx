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
import { useState,useRef} from "react"
import { Textarea } from "@/components/ui/textarea"
// import GeneratePodcast from "@/components/GeneratePodcast"
//import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
// import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import LoaderSpinner from '@/components/LoaderSpinner';


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
  desc: z.string().min(2),
  coverImg: z.string().min(2)
})

const AIEditor = dynamic(() => import("@/components/AIEditor"), {
    ssr: false,
    loading: () => <LoaderSpinner style={{ margin: "0 0 0 10px" }} />,
  });


const CreatePodcast = () => {
  const { status } = useSession();
  const router = useRouter()

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageUrl, setImageUrl] = useState('');

  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioDuration, setAudioDuration] = useState(0);

  const [voiceType, setVoiceType] = useState<string | null>(null);
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
      coverImg:""
    },
  })


  if (status === 'unauthenticated') {
    return router.push("/");
  }
  if (status === 'loading') { return <LoaderSpinner /> }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer()
      .then((ab) => new Blob([ab]));

      handleImage(blob, file.name);
    } catch (error) {
      console.log(error)
      toast({ title: 'Error uploading image', variant: 'destructive'})
    }
  }


  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    //setImage('');

    try {
      const file = new File([blob], fileName, { type: 'image/png' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      //setImage(imageUrl!);
      setIsImageLoading(false);
      toast({
        title: "Thumbnail generated successfully",
      })
    } catch (error) {
      console.log(error)
      toast({ title: 'Error generating thumbnail', variant: 'destructive'})
    }
  }

  const postFile= async(readyFile: UploadFile)=>{
    const formData = new FormData()
    formData.append(props.name, readyFile.raw)

    let res: AxiosResponse | null = null
    try {
        //上传相同的文件，onchange事件不会被出发，需要上传完成后，重置value
        if(fileInputRef.value) {
            fileInputRef.value.value = ''
        }

        readyFile.status = 'loading'
        res= await axios.post(props.action, formData, {
            headers: props.headers,
            withCredentials: props.withCredentials
        })
        
    } catch (e) {
        readyFile.status = 'error'

    } finally {
        if(fileInputRef.value) {
            fileInputRef.value.value = ''
        }
    }
    if (!res || !res.data) {

        readyFile.status = 'error'
        return
    }
    readyFile.status = 'success'
    readyFile.resp = res.data
}



  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if (!audioUrl || !imageUrl || !voiceType) {
        toast({
          title: 'Please generate audio and image',
        })
        setIsSubmitting(false);
        throw new Error('Please generate audio and image')
      }

      const podcast = {}
      toast({ title: 'Podcast created' })
      setIsSubmitting(false);
      router.push('/')
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

            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold  ">
                Select AI Voice
              </Label>

              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                  <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-1 " />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold   focus:ring-orange-1">
                  {voiceCategories.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && (
                  <audio
                    src={`/${voiceType}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                )}
              </Select>
            </div>

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
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold  ">CoverImg</FormLabel>
                  <FormControl>
                  <Input 
                    type="file"
                    className="hidden"
                    ref={imageRef}
                    onChange={(e) => uploadImage(e)}
                  />
                  </FormControl>
                  <FormMessage className=" " />
                </FormItem>
              )}
            />
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
              <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold   transition-all duration-500 hover:bg-black-1">
                {isSubmitting ? (
                  <>
                    Submitting
                    <Loader size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  'Submit & Publish Podcast'
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
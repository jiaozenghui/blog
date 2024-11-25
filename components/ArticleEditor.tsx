"use client";

import { useEffect } from "react";
import { FC, ReactNode } from "react";
import { Avatar, Button, Dropdown, Input, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import useUserWriteArticle from "@/store/user/article-create";

export const initValue = {
    title: "",
    content: "",
    tag: [] as number[],
    reprint: null as null | string,
    description: null as null | string,
    cover_file_name: null as null | string,
    cover_url: null as null | string,
    theme_id: 0,
};

type articleContextType = typeof initValue;
type articleDataType = Omit<articleContextType, "coverUrl">;
/** 用于和服务器交互的当前文章参数*/
type articleParamsType = articleDataType & {
    cover_file_name: articleContextType["cover_file_name"];
};
interface propsType {
    /** Head组件*/
    meta: ReactNode;
    /** 提交事件*/
    submit: (values: articleParamsType) => void;
    /** 是否展示保存草稿箱按钮*/
    showDraftsButton?: boolean;
}
export type modalPropsType = Pick<propsType, "submit">;
const ArticleEditor: FC<propsType> = (props) => {

    let articleData = useUserWriteArticle((s) => s.data);
    let updateData = useUserWriteArticle((s) => s.updateData);
    let resetArticleData = useUserWriteArticle((s) => s.resetData);

    useEffect(() => {
        return () => {
            resetArticleData();
        };
    }, [resetArticleData]);


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
};
export default ArticleEditor;

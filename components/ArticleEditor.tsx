"use client";

import { useEffect } from "react";
import { FC, ReactNode } from "react";
import { SmileOutlined } from "@ant-design/icons";

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
import { Textarea } from "@/components/ui/textarea"
// import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import useUserWriteArticle from "@/store/user/article-create";
import axios, { Get } from "@axios";

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
    articleId?: string
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
        async function fetchPosts() {
            const [e, r] = await Get(`/api/articles/${props.articleId}`)
        }
        // fetchPosts()
        return () => {
            resetArticleData();
            //fetchPosts()
        };

    }, [resetArticleData]);


    return (
        <></>
    )
};
export default ArticleEditor;

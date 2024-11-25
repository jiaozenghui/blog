"use client"

import { useEffect } from "react";
import { z } from "zod"
import dynamic from 'next/dynamic';

import { useState, useRef } from "react"

// import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import LoaderSpinner from '@/components/LoaderSpinner';
import axios, {Get} from "@axios";
import { articleListItemType } from "@/types/article";
import { Result } from 'antd';
import { authOptions, getAuthSession } from "@/utils/auth";
import useFetch from "@/common/hooks/useFetch";
import useUserWriteArticle from "@/store/user/article-create";
import ArticleEditor from "@/components/ArticleEditor";


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


const CreatePodcast = ({ params: { id } }: { params: { id: string } }) => {
    let updateData = useUserWriteArticle((s) => s.updateData);
    // let { data, isLoading, refetch } = useFetch(() =>
    //     axios.get(`/api/articles/${id}`).then((res) => res.data.data),
    // );


    // 为状态设置值
    // useEffect(() => {
    //     if (data) {
    //         let {
    //             title,
    //             content,
    //             reprint,
    //             desc,
    //             cover_url,
    //             theme_id,
    //         } = data;
    //         updateData({
    //             title,
    //             content,
    //             reprint,
    //             desc,
    //             cover_url,
    //             theme_id,
    //         });
    //     }
    // }, [updateData, data]);

    return (
        <ArticleEditor 
        articleId={id}
            submit={(values) => {
                axios
                .put(`/article/${id}`, { ...values, state: 1 })
                .then((res) => {

                    //refetch();
                })
                .catch((err) => {

                });
            }}
        />
    )
}

export default CreatePodcast
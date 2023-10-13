"use client";

import { generate } from "@/lib/action";
import FileUpload from "@/components/fileUpload";

import { SendHorizonal } from "lucide-react";
import { useState } from "react";
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { LoadingCircle } from "./icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { DEFAULT_PATTERN } from "@/lib/constants";
import { toast } from "sonner";

export default function Form({
    promptValue,
    patternValue,
}: {
    promptValue?: string;
    patternValue?: string;
}) {
    const router = useRouter();
    const [prompt, setPrompt] = useState(promptValue || "");
    const [placeholderPrompt, setPlaceholderPrompt] = useState("");


    const [pattern, setPattern] = useState(patternValue || DEFAULT_PATTERN);
    const [openPopover, setOpenPopover] = useState(false);

    const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            if (file.size / 1024 / 1024 > 5) {
                toast.error("File size too big (max 5MB)");
            } else if (file.type !== "image/png" && file.type !== "image/jpeg") {
                toast.error("File type not supported (.png or .jpg only)");
            } else {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPattern(e.target?.result as string);
                    setOpenPopover(false);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <form
            className="mx-auto mt-6 flex w-full max-w-xl items-center space-x-2 rounded-lg border border-gray-200 bg-white px-1 py-2 shadow-md sm:px-2 sm:py-4"
            action={(data) => {
                generate(data).then((id) => {
                    router.push(`/t/${id}`);
                })
            }}>
            <h1 className="text-white">sdsdsd</h1>
            <FileUpload />
            <br />
            <SubmitButton />
        </form >
    );
}

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            className={cn(
                "group rounded-lg p-2.5",
                pending
                    ? "cursor-disabled bg-gray-100"
                    : "transition-all hover:bg-gray-100 active:bg-gray-200",
            )}
            disabled={pending}
        >
            {pending ? (
                <LoadingCircle />
            ) : (
                <SendHorizonal className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            )}
        </button>
    );
};
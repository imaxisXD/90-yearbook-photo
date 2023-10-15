'use client'
import { SendHorizonal } from "lucide-react";
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { LoadingCircle } from "./icons";
import { cn } from "@/lib/utils";

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className={cn(
                "group p-2.5 w-full rounded-lg bg-[#ff0087]/90",
                pending
                    ? "cursor-disabled bg-gray-100"
                    : "transition-all hover:bg-[#4371dd] active:bg-gray-200 duration-150",
            )}
            disabled={pending}
        >
            {pending ? (
                <LoadingCircle />
            ) : (
                <div className="flex items-center justify-center text-white gap-1 transition duration-75">
                    <p className="text-xl group-hover:text-white ">Submit</p>
                    <SendHorizonal className="h-6 w-5 text-white  group-hover:scale-110
                     -rotate-12 transition duration-150" />
                </div>
            )}
        </button>
    );
};
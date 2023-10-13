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
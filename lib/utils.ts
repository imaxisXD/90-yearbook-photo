import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { customAlphabet } from "nanoid";

export const { useUploadThing, uploadFiles } =
    generateReactHelpers<OurFileRouter>();


// 7-character random string
export const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
);
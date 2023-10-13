"use client";
import { generate } from "@/lib/action";
import FileUpload from "@/components/fileUpload";
import { useRouter } from "next/navigation";
import SubmitButton from "./submit-button";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";


export default function Form() {
    const router = useRouter();

    // const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files && e.target.files[0];
    //     if (file) {
    //         if (file.size / 1024 / 1024 > 5) {
    //             toast.error("File size too big (max 5MB)");
    //         } else if (file.type !== "image/png" && file.type !== "image/jpeg") {
    //             toast.error("File type not supported (.png or .jpg only)");
    //         } else {
    //             const reader = new FileReader();
    //             reader.onload = (e) => {
    //                 setPattern(e.target?.result as string);
    //                 setOpenPopover(false);
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     }
    // };

    return (
        <form action={
            (data) => {
                generate(data).then((id) => {
                    router.push(`/t/${id}`);
                })
            }}>
            <div className="p-2 rounded-xl w-full">
                <div
                    className="flex justify-center border-sky-400 gap-5 items-center flex-col border-dashed bg-white border-2 rounded-xl cursor-pointer py-8"
                >
                    <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                    />
                    <>
                        <UploadCloud className="text-sky-400 h-10 w-10" />
                        <p className="text-sm text-gray-600 text-center ">
                            You can also drag and drop an image here.
                        </p>
                    </>
                </div>
            </div>
            <SubmitButton />
        </form >



        // <form
        //     className="mx-auto mt-6 flex w-full max-w-xl items-center space-x-2 rounded-lg border border-gray-200 bg-white px-1 py-2 shadow-md sm:px-2 sm:py-4"
        //     action={(data) => {
        //         generate(data).then((id) => {
        //             // router.push(`/t/${id}`);
        //         })
        //     }}>
        //     <h1 className="text-white">sdsdsd</h1>
        //     {/* <FileUpload />
        //     <SubmitButton /> */}
        // </form >
    );
}


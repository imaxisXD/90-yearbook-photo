"use client";
import { generate } from "@/lib/action";
import { useRouter } from "next/navigation";
import SubmitButton from "./submit-button";
import { toast } from "sonner";
import { UploadCloud, XCircle } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";


export default function Form() {
    const router = useRouter();
    const [dragActive, setDragActive] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [showImage, setShowImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
                    setImageUrl(e.target?.result as string);
                    setShowImage(true);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <form action={
            (data) => {
                // upload(data).then((imageUrl) => {
                //     toast.success(String(imageUrl))
                // });
                generate(data).then((id) => {
                    router.push(`/t/${id}`);
                })
            }}>
            <div className="p-2 flex flex-col items-center justify-center rounded-xl border border-red-400 w-full text-black">
                {!(showImage && imageUrl) ?
                    (<label htmlFor="imageFile" className="flex flex-col items-center justify-center border border-dashed rounded-xl w-11/12 group cursor-pointer h-96 hover:border-sky-400">
                        <div className="flex flex-col items-center justify-center gap-8"
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDragActive(true);
                            }}
                            onDragEnter={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDragActive(true);
                            }}
                            onDragLeave={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDragActive(false);
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDragActive(false);
                                const file = e.dataTransfer.files && e.dataTransfer.files[0];
                                if (file) {
                                    if (file.size / 1024 / 1024 > 5) {
                                        toast.error("File size too big (max 5MB)");
                                    } else if (
                                        file.type !== "image/png" &&
                                        file.type !== "image/jpeg"
                                    ) {
                                        toast.error("File type not supported (.png or .jpg only)");
                                    } else {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            setImageUrl(e.target?.result as string);
                                            setShowImage(true);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }
                            }}
                        >
                            <UploadCloud
                                className={`${dragActive ? "scale-110" : "scale-100"
                                    } h-7 w-7 text-gray-600 transition-all duration-75 group-hover:scale-110 group-active:scale-95
                                group-hover:text-sky-400
                                `}
                            />
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-gray-400 px-1">Drag and drog or click to upload</p>
                                <p className="text-gray-500 px-1">Recommeded: Image should have clear view of your face</p>
                            </div>
                            <span className="sr-only">Image upload</span>
                        </div>
                    </label>) :
                    (<div className="relative flex flex-col items-center justify-center border border-dashed border-black rounded-xl w-11/12 group h-96 hover:border-red-400">
                        <Image
                            src={imageUrl}
                            alt="Image you uploaded"
                            fill
                            className="object-cover rounded-xl"
                        />
                        <XCircle className="absolute right-1 top-1 cursor-pointer text-red-400"
                            onClick={() => {
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                }
                                setShowImage((prev) => !prev)
                                setImageUrl("")
                            }} />
                    </div>)
                }
                <input
                    id="imageFile"
                    name="imageFile"
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    className="sr-only hidden"
                    onChange={onChangePicture}
                    ref={fileInputRef}
                    readOnly
                />
                <fieldset>
                    <legend>Select Gender:</legend>
                    <div>
                        <input type="radio" id="man" name="gender" value="man" required />
                        <label htmlFor="man">Man</label>
                    </div>
                    <div>
                        <input type="radio" id="woman" name="gender" value="woman" />
                        <label htmlFor="woman">Woman</label>
                    </div>
                </fieldset>
            </div>
            <input className="hidden" name="imageUrl" value={imageUrl} readOnly />
            <SubmitButton />
        </form >
    );
}
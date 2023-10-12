'use client';
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useDropzone } from 'react-dropzone'
import { useUploadThing } from "@/lib/utils";


function FileUpload() {
    const { startUpload, isUploading } = useUploadThing("imageUploader",
        {
            onClientUploadComplete: () => {
                toast.success('Success: Photo is uploaded')
            },
            onUploadError: () => {
                toast.error("error occurred while uploading")
            },
            onUploadBegin: () => {
                toast('Photo upload started')
            },
        }

    )
    const { getInputProps, getRootProps } = useDropzone(
        {
            accept: {
                'image/jpeg': [],
                'image/png': []
            },
            maxFiles: 1,
            onDrop: (acceptFile) => {
                startUpload(acceptFile)
            },
            onDropRejected: () => { console.log('rejected') },
            onError: () => { console.log('error') }
        }
    );
    return (
        <div className="p-2 rounded-xl w-full">
            {!isUploading &&
                <div {...getRootProps({
                    className: "flex justify-center border-sky-400 gap-5 items-center flex-col border-dashed bg-white border-2 rounded-xl cursor-pointer py-8"

                })}>
                    <input {...getInputProps()} />
                    <>
                        <UploadCloud className="text-sky-400 h-10 w-10" />
                        <p className="text-sm text-gray-600 text-center ">
                            You can also drag and drop an image here.
                        </p>
                    </>
                </div>
            }
        </div>
    )
}

export default FileUpload
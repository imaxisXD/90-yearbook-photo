import { notFound, redirect } from "next/navigation";
import FormRSC from "@/components/form-rsc";
import { Metadata } from "next";

// export async function generateMetadata({
//     params,
// }: {
//     params: {
//         id: string;
//     };
// }): Promise<Metadata | undefined> {
//     // const data = await kv.hgetall<{ prompt: string; image?: string }>(params.id);
//     if (!data) {
//         return;
//     }
//     const title = `Spirals: ${data.prompt}`;
//     const description = `A spiral generated from the prompt: ${data.prompt}`;
//     const image = data.image || "https://spirals.vercel.app/opengraph-image.png";

//     return {
//         title,
//         description,
//         openGraph: {
//             title,
//             description,
//         },
//         twitter: {
//             card: "summary_large_image",
//             title,
//             description,
//             creator: "@steventey",
//         },
//     };
// }

export default async function Results() {
    // const data = await kv.hgetall<{
    //     prompt: string;
    //     pattern?: string;
    //     image?: string;
    // }>(params.id);
    const data = ''
    if (!data) {
        redirect("/")
    }
    return (
        <FormRSC
        />
    );
}

import { notFound, redirect } from "next/navigation";
import FormRSC from "@/components/form-rsc";
import { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/database";
import { photoTable } from "@/lib/database/schema";
import { eq } from "drizzle-orm";
import PhotoBooth from "@/components/photo-booth";

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

export default async function Results({
    params,
}: {
    params: {
        id: string;
    };
}) {

    const result = await db.select().from(photoTable).where(eq(photoTable.imageId, params.id));
    console.log(result);

    if (!result) {
        redirect("/")
    }
    return (
        <PhotoBooth image={result[0].resultImageUrl || null} />
    );
}
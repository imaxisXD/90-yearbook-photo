import { db } from "@/lib/database";
import { photoTable } from "@/lib/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";



export async function POST(req: Request) {
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id") as string;
    const utapi = new UTApi();

    if (process.env.REPLICATE_WEBHOOK_SECRET) {
        // if a secret is set, verify it
        const secret = searchParams.get("secret") as string;
        if (secret !== process.env.REPLICATE_WEBHOOK_SECRET) {
            return new Response("Invalid secret", { status: 401 });
        }
    }

    // get output from Replicate
    const body = await req.json();

    const { output } = body;
    if (!output) {
        return new Response("Missing output", { status: 400 });
    }

    // convert output to a blob object
    const file = await fetch(output[0]).then((res) => res.blob());

    // upload & store in UploadThing
    const imageResponse = await utapi.uploadFiles(file);
    // store it in databse
    await db.update(photoTable).set({
        resultImageUrl: imageResponse.data?.url
    }).where(eq(photoTable.imageId, id));

    return NextResponse.json({ ok: true });
}
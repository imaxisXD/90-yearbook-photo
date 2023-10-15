
import { db } from "@/lib/database";
import { photoTable } from "@/lib/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id") as string;

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

    // upload & store in UploadThing
    // store it in databse

    const res = await db.update(photoTable).set({
        resultImageUrl: output
    }).where(eq(photoTable.imageId, id.toString())).returning();

    return NextResponse.json({ ok: true });
}
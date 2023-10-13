import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";



export async function POST(req: Request) {
    console.log(req);

    console.log('HEREEE - 1 ');
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id") as string;
    const utapi = new UTApi();

    if (process.env.REPLICATE_WEBHOOK_SECRET) {
        // if a secret is set, verify it
        console.log('HEREEE - 2 ');

        const secret = searchParams.get("secret") as string;
        if (secret !== process.env.REPLICATE_WEBHOOK_SECRET) {
            return new Response("Invalid secret", { status: 401 });
        }
        console.log('HEREEE - 3 ');

    }
    console.log('HEREEE - 4 ');

    // get output from Replicate
    const body = await req.json();
    console.log("---->", body);

    const { output } = body;

    if (!output) {
        return new Response("Missing output", { status: 400 });
    }
    console.log("---->", output);

    // convert output to a blob object
    const file = await fetch(output[0]).then((res) => res.blob());

    // upload & store in UploadThing
    const response = await utapi.uploadFiles(file);

    console.log(response);
    console.log('HEREEE');


    return NextResponse.json({ ok: true });
}
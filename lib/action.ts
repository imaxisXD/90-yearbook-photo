"use server";
import Replicate from "replicate";
import { nanoid } from "./utils";
import { SITE_URL } from "./constants";
import { UTApi } from "uploadthing/server";
import { db } from "./database";
import { photoTable } from "./database/schema";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function generate(form: FormData) {
    const id = nanoid();
    const utapi = new UTApi();
    let imageUrl = form.get("imageUrl") as string;
    let gender = form.get('gender') as String;
    let imageFile = form.get('imageFile') as File;
    if (imageFile.size > 0) {
        const response = await utapi.uploadFiles(imageFile);
        if (response.error) {
            throw new Error(String(response.error))
        }
        imageUrl = response.data.url;
    }
    await db.insert(photoTable).values({
        imageId: id.toString(),
        inputImageUrl: imageUrl,
    })
    const webhook = new URL(`${SITE_URL}/api/webhook`)
    webhook.searchParams.set("id", id)
    webhook.searchParams.set("secret", process.env.REPLICATE_WEBHOOK_SECRET as string)
    await Promise.all([
        replicate.predictions.create({
            version: "556bdffb674f9397e6f70d1607225f1ee2dad99502d15f44ba19d55103e1cba3",
            input: {
                image: imageUrl,
                gender: gender.toLowerCase()
            },
            webhook: webhook.toString(),
            webhook_events_filter: ["completed"],
        }),
    ]);
    return id;
}
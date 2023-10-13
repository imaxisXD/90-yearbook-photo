"use server";
import Replicate from "replicate";
import { nanoid } from "./utils";
import { SITE_URL } from "./constants";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function generate(form: FormData) {
    const id = nanoid();
    const gender = form.get("gender") as string;
    let imageUrl = form.get("imageUrl") as string;

    const webhook = new URL(`${SITE_URL}/api/webhook`)
    webhook.searchParams.set("id", id)
    webhook.searchParams.set("secret", process.env.REPLICATE_WEBHOOK_SECRET as string)
    const res = await Promise.all([
        replicate.predictions.create({
            version: "556bdffb674f9397e6f70d1607225f1ee2dad99502d15f44ba19d55103e1cba3",
            input: {
                image: "https://replicate.delivery/pbxt/Jfg92BmhBy7STca9SVZmbLmYYExiSYIMMSPhKrO1Ap1mqFZE/rafa.jpg",
                gender: gender.toLowerCase()
            },
            webhook: webhook.toString(),
            webhook_events_filter: ["completed"],
        }),
    ]);
    return id;
}
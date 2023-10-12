"use server";

import Replicate from "replicate";
import { nanoid } from "./utils";
import { WEBHOOK_URL } from "./constants";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function generate(form: FormData) {

    const id = nanoid();

    const res = await Promise.all([

        replicate.predictions.create({
            version: "556bdffb674f9397e6f70d1607225f1ee2dad99502d15f44ba19d55103e1cba3",
            input: {
                image: '',
                gender: ''
            },
            webhook: `${WEBHOOK_URL}?id=${id}${process.env.REPLICATE_WEBHOOK_SECRET
                ? `&secret=${process.env.REPLICATE_WEBHOOK_SECRET}`
                : ""
                }`,
            webhook_events_filter: ["completed"],
        }),
    ]);

    console.log(res);

    return id;
}
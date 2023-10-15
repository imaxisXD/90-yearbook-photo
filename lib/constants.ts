export const SITE_URL =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : process.env.NGROK_URL

export const DEFAULT_PATTERN =
    "https://xd2kcvzsdpeyx1gu.public.blob.vercel-storage.com/8uiaWqu-77Maq6Zn38dfz9iWwXsyaheFfOSJPL.png";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['pbxt.replicate.delivery'],
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig

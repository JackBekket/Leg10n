/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    TELEGRAM_KEY: process.env.TELEGRAM_KEY,
  },
}

module.exports = nextConfig

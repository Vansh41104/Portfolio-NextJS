/** @type {import('next').NextConfig} */
const nextConfig = {
  // Type errors should fail the build. If the unused components/ui/* template
  // files ever block this, delete them rather than re-disabling the check.
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

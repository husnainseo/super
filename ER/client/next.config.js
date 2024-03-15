/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname:'lh3.googleusercontent.com',
          },
          {
            hostname:'ui-avatars.com'
          },
          {
            hostname:'res.cloudinary.com'
          },
          {
            hostname:'images.pexels.com'
          },
          {
            hostname:"picsum.photos"
          },
          {
            hostname:"source.unsplash.com"
          }
        ],
      },
    }
     

module.exports = nextConfig;

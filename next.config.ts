import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'res.cloudinary.com'
      }
    ]
  },
  /* config optons here */
  experimental:{
    serverActions: {
        bodySizeLimit: '20mb' // Set desired value here
    }
  }
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // output: 'standalone',
//   turbopack: {
//     root: __dirname,
//   },
//   productionBrowserSourceMaps: false,

//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production",
//   },

//   images: {
//     dangerouslyAllowSVG: true,
//     contentDispositionType: "attachment",
//     remotePatterns: [
//       { protocol: "https", hostname: "images.unsplash.com" },
//       { protocol: "https", hostname: "placehold.co" },
//       { protocol: "https", hostname: "cdn.jsdelivr.net" },
//       { protocol: "https", hostname: "upload.wikimedia.org" },
//       { protocol: "https", hostname: "strapi.io" },
//       { protocol: "https", hostname: "assets.vercel.com" },
//     ],
//   },

//   // Security headers
//   async headers() {
//     const csp =
//       "default-src 'self'; " +
//       "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
//       "style-src 'self' 'unsafe-inline'; " +
//       "img-src 'self' blob: data: https:; " +
//       "font-src 'self' data:; " +
//       "frame-src 'self' https://www.google.com https://www.google.com/maps https://maps.google.com https://www.googleusercontent.com; " +
//       "child-src 'self' https://www.google.com https://www.google.com/maps https://maps.google.com https://www.googleusercontent.com;";

//     return [
//       {
//         source: "/:path*",
//         headers: [
//           {
//             key: "Strict-Transport-Security",
//             value: "max-age=63072000; includeSubDomains; preload",
//           },

//           // ❌ Removed because it blocks iframes usage in many setups
//           // {
//           //   key: "X-Frame-Options",
//           //   value: "DENY",
//           // },

//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff",
//           },

//           {
//             key: "Content-Security-Policy",
//             value: csp,
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  productionBrowserSourceMaps: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "strapi.io" },
      { protocol: "https", hostname: "ap-south-1.graphassets.com" },
      { protocol: "https", hostname: "assets.vercel.com" },

      // portfolio images domains
      { protocol: "https", hostname: "navkaarrealestate.com" },
      { protocol: "https", hostname: "trippyjiffy.com" },
      { protocol: "https", hostname: "optimyzlearning.com" },
      { protocol: "https", hostname: "www.smcsystem.com" },
      { protocol: "https", hostname: "yogsaathi.com" },
      { protocol: "https", hostname: "aimascend.com" },
      { protocol: "https", hostname: "arvindrai.com" },
      { protocol: "https", hostname: "avyantahotels.com" },
    ],
  },

  async headers() {
    const csp =
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' blob: data: https:; " +
      "font-src 'self' data:; " +
      "frame-src 'self' https://www.google.com https://www.google.com/maps https://maps.google.com https://www.googleusercontent.com; " +
      "child-src 'self' https://www.google.com https://www.google.com/maps https://maps.google.com https://www.googleusercontent.com;";

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
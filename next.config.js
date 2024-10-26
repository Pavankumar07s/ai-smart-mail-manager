// Import env variables if needed
if (process.env.SKIP_ENV_VALIDATION) {
  await import("./src/env.js");
}

/** @type {import("next").NextConfig} */
const config = {
  // Ignore TypeScript errors in production builds
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable ESLint during builds for production
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Other Next.js config options can go here
};

export default config;

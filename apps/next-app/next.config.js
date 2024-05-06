//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const withExport = process.env.NEXT_PUBLIC_EXPORT === 'true';
/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/


const nextConfig = {
  ...(withExport && { output: 'export'}),
  assetPrefix: "./",
  images: {
    unoptimized: true,
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    API_BASE_URL: process.env.NX_NEXT_PUBLIC_API_BASE_URL,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
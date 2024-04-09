/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	 output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
	images: {
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

module.exports = nextConfig;

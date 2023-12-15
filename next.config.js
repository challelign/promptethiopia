/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ["mongoose"],
	},
	// env: {
	// 	GITHUB_ID: "1374dc79f86278d6a2ad",
	// 	GITHUB_SECRET: "a6b4a564dbde86d872a23df898cd1b09229000ea",
	// },
	images: {
		domains: ["lh3.googleusercontent.com", "images.pexels.com"],
	},
	webpack(config) {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		return config;
	},
};

// module.exports = nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	experimental: {
// 		serverComponentsExternalPackages: ["mongoose"],
// 	},
// 	images: {
// 		domains: ["lh3.googleusercontent.com", "images.pexels.com"],
// 	},
// 	webpack(config) {
// 		config.experiments = {
// 			...config.experiments,
// 			topLevelAwait: true,
// 		};
// 		return config;
// 	},
// };

// module.exports = nextConfig;

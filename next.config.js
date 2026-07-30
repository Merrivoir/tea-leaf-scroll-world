/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/tea-leaf-scroll-world',
  assetPrefix: '/tea-leaf-scroll-world', 
  
  images: {
    unoptimized: true, // Обязательно для GitHub Pages
  },
  
  typescript: {
    ignoreBuildErrors: true, 
  },
};

export default nextConfig;

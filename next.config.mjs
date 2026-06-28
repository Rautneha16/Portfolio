import fs from 'fs';
import path from 'path';

const logoPath = path.resolve('src/components/images/logo');
if (fs.existsSync(logoPath)) {
  fs.renameSync(logoPath, logoPath + '.png');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    return config;
  },
};

export default nextConfig;

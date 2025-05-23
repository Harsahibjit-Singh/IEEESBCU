/** @type {import('next').NextConfig} */
const nextConfig = {theme: {
    extend: {
      dropShadow: {
        'glow': [
          '0 0 2px rgba(147, 197, 253, 0.9)',
          '0 0 4px rgba(147, 197, 253, 0.7)'
        ]
      }
    }
  }};

export default nextConfig;

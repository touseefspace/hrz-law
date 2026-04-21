import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  allowedDevOrigins: ['procryptic-remi-internidal.ngrok-free.dev'],
};

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.29.46'],
};

export default withPayload(nextConfig, { devBundleServerPackages: false });

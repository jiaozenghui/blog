/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.imooc-lego.com",
      },
      {
        protocol: "https",
        hostname: "dashscope-result-bj.oss-cn-beijing.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "dashscope-result-hz.oss-cn-hangzhou.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "dashscope-result-sh.oss-cn-shanghai.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "dashscope-result-wlcb.oss-cn-wulanchabu.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "dashscope-result-zjk.oss-cn-zhangjiakou.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "dashscope-result-sz.oss-cn-shenzhen.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "dashscope-result-hy.oss-cn-heyuan.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "dashscope-result-cd.oss-cn-chengdu.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "dashscope-result-gz.oss-cn-guangzhou.aliyuncs.com",
      },
    ],
  },
};

export default nextConfig;

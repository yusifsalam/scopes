import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cgnnjwcrmtzgnbadukry.supabase.co",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/kauris", destination: "/capricorn" },
      { source: "/vesimies", destination: "/aquarius" },
      { source: "/kalat", destination: "/pisces" },
      { source: "/oinas", destination: "/aries" },
      { source: "/härkä", destination: "/taurus" },
      { source: "/kaksoset", destination: "/gemini" },
      { source: "/rapu", destination: "/cancer" },
      { source: "/leijona", destination: "/leo" },
      { source: "/neitsyt", destination: "/virgo" },
      { source: "/vaaka", destination: "/libra" },
      { source: "/skorpioni", destination: "/scorpio" },
      { source: "/jousimies", destination: "/sagittarius" },

      { source: "/ram", destination: "/aries" },
      { source: "/bull", destination: "/taurus" },
      { source: "/twin", destination: "/gemini" },
      { source: "/crab", destination: "/cancer" },
      { source: "/lion", destination: "/leo" },
      { source: "/virgin", destination: "/virgo" },
      { source: "/horizontal", destination: "/libra" },
      { source: "/scorpion", destination: "/scorpio" },
      { source: "/centaur", destination: "/sagittarius" },
      { source: "/pisces%20fishes", destination: "/pisces" },
    ];
  },
};

export default nextConfig;

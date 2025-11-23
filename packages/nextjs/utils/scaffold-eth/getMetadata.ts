import type { Metadata } from "next";

function buildMiniappEmbed(imageUrl: string, imageRelativePath: string, title: string, baseUrl: string): string {
  return JSON.stringify({
    version: "next",
    imageUrl,
    button: {
      title,
      action: {
        type: "launch_miniapp",
        name: title,
        url: baseUrl,
        splashImageUrl: baseUrl + "/splash.png",
        splashBackgroundColor: "#ffffff",
      },
    },
  });
}

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;
const titleTemplate = "%s | Scaffold-ETH 2";

export const getMetadata = ({
  title,
  description,
  imageRelativePath = "/opengraph-image.png",
}: {
  title: string;
  description: string;
  imageRelativePath?: string;
}): Metadata => {
  const imageUrl = `${baseUrl}${imageRelativePath}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: titleTemplate,
    },
    description: description,
    openGraph: {
      title: {
        default: title,
        template: titleTemplate,
      },
      description: description,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      title: {
        default: title,
        template: titleTemplate,
      },
      description: description,
      images: [imageUrl],
    },
    icons: {
      icon: [
        {
          url: "/favicon.png",
          sizes: "32x32",
          type: "image/png",
        },
      ],
    },
    other: {
      "fc:miniapp": buildMiniappEmbed(imageUrl, imageRelativePath, title, baseUrl),
    },
  };
};

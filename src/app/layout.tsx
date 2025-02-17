import SplashScreen from "@/components/splashscreen";
import "./globals.scss";
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import Head from "next/head";

const APP_NAME = "Plac";
const APP_DEFAULT_TITLE = "Plac";
const APP_TITLE_TEMPLATE = "%s | Plac";
const APP_DESCRIPTION = "Application de gestion de chantiers";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="fr">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="min-h-screen flex flex-col">
          <Providers>
            <SplashScreen />
            {children}
          </Providers>
      </body>
    </html>
  );
}

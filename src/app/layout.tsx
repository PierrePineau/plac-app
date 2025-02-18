import SplashScreen from "@/components/splashscreen";
import "./globals.scss";
import localFont from 'next/font/local';
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

const Satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})
// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="fr">
      {/* <Head>
      </Head> */}
      <body className="min-h-screen flex flex-col">
          <Providers>
            <SplashScreen />
            {children}
          </Providers>
      </body>
    </html>
  );
}

import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "cyberdex",
  description: "Bienvenue sur CyberDeck, l'univers où la cybersécurité prend vie sous forme de cartes à collectionner et d'éléments interactifs! Découvrez un monde fascinant où hackers, experts en sécurité, outils technologiques, et menaces virtuelles s'affrontent dans des scénarios stratégiques captivants",
  icons: "/cyberdex.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

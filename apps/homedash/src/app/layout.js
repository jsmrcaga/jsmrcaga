import "./globals.css";
import { DM_Sans } from 'next/font/google';

import { classnames } from '../components/utils/classnames';

const dm_sans = DM_Sans({
  weight: ['500', '700']
});

console.log({ dm_sans });

export const metadata = {
  title: "Homedash",
  description: "Homelab dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={classnames(dm_sans.className)}
      >
        {children}
      </body>
    </html>
  );
}

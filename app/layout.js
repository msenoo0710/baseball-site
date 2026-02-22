import './globals.css';

export const metadata = {
  title: '〇〇少年野球クラブ | YOUR TEAM',
  description: '〇〇少年野球クラブの公式サイトです。活動報告やメンバー紹介をお届けします。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

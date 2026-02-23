import { getLatestReports, getTeamInfo, getMembersAndCoaches, getPageSeo } from '@/lib/microcms';
import HomeContent from '@/components/HomeContent';

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

export async function generateMetadata() {
  const [seo, team] = await Promise.all([
    getPageSeo('home'),
    getTeamInfo(),
  ]);

  const title = seo?.pageTitle || team.teamName || '少年野球クラブ';
  const description = seo?.pageDescription || `${team.teamName}の公式サイトです。`;
  const ogImage = seo?.ogImage || team.mainVisual;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: team.teamName || title,
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function HomePage() {
  try {
    const [reports, team, { players, coaches }] = await Promise.all([
      getLatestReports(4),
      getTeamInfo(),
      getMembersAndCoaches(),
    ]);

    return (
      <HomeContent
        reports={reports}
        team={team}
        players={players.slice(0, 6)}
        coaches={coaches}
      />
    );
  } catch (e) {
    return (
      <HomeContent
        reports={[]}
        team={{ teamName: '〇〇少年野球クラブ', teamLabel: 'YOUR TEAM', motto: '', subtitle: '', introduction: '', schedule: '', location: '', target: '', contactInfo: '', mainVisual: null }}
        players={[]}
        coaches={[]}
      />
    );
  }
}

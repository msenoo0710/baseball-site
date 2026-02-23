import { getReports, getTeamInfo, getPageSeo } from '@/lib/microcms';
import ReportsContent from '@/components/ReportsContent';

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

export async function generateMetadata() {
  const [seo, team] = await Promise.all([
    getPageSeo('reports'),
    getTeamInfo(),
  ]);

  const siteName = team.teamName || '少年野球クラブ';
  const title = seo?.pageTitle || `活動報告 | ${siteName}`;
  const description = seo?.pageDescription || `${siteName}の活動報告をお届けします。`;
  const ogImage = seo?.ogImage || team.mainVisual;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/reports`,
      siteName,
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

export default async function ReportsArchive() {
  try {
    const [reports, team] = await Promise.all([
      getReports(),
      getTeamInfo(),
    ]);
    return <ReportsContent reports={reports} team={team} />;
  } catch (e) {
    return <ReportsContent reports={[]} />;
  }
}

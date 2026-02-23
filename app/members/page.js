import { getMembersAndCoaches, getTeamInfo, getPageSeo } from '@/lib/microcms';
import MembersContent from '@/components/MembersContent';

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

export async function generateMetadata() {
  const [seo, team] = await Promise.all([
    getPageSeo('members'),
    getTeamInfo(),
  ]);

  const siteName = team.teamName || '少年野球クラブ';
  const title = seo?.pageTitle || `メンバー紹介 | ${siteName}`;
  const description = seo?.pageDescription || `${siteName}の選手・監督・コーチを紹介します。`;
  const ogImage = seo?.ogImage || team.mainVisual;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/members`,
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

export default async function MembersPage() {
  try {
    const [{ players, coaches }, team] = await Promise.all([
      getMembersAndCoaches(),
      getTeamInfo(),
    ]);
    return <MembersContent players={players} coaches={coaches} team={team} />;
  } catch (e) {
    return <MembersContent
      players={[]}
      coaches={[]}
      team={{ teamName: '', teamLabel: '', motto: '', subtitle: '', introduction: '', schedule: '', location: '', target: '', contactInfo: '', mainVisual: null, recruitTitle: '', recruitMessage: '' }}
    />;
  }
}
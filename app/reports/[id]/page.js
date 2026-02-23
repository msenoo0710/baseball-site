import { getReportById, getReports, getTeamInfo, stripHtml } from '@/lib/microcms';
import ReportDetailContent from '@/components/ReportDetailContent';
import { notFound } from 'next/navigation';

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const [report, team] = await Promise.all([
      getReportById(id),
      getTeamInfo(),
    ]);

    const siteName = team.teamName || '少年野球クラブ';
    const title = `${report.title} | ${siteName}`;
    const description = report.body
      ? stripHtml(report.body).slice(0, 120)
      : `${siteName}の活動報告です。`;
    const ogImage = report.thumbnail || team.mainVisual;

    return {
      title,
      description,
      openGraph: {
        title: report.title,
        description,
        url: `${SITE_URL}/reports/${id}`,
        siteName,
        type: 'article',
        ...(report.date && { publishedTime: report.date }),
        ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
      },
      twitter: {
        card: 'summary_large_image',
        title: report.title,
        description,
        ...(ogImage && { images: [ogImage] }),
      },
    };
  } catch {
    return { title: '記事が見つかりません' };
  }
}

export default async function ReportDetailPage({ params }) {
  const { id } = await params;

  try {
    const [report, allReports, team] = await Promise.all([
      getReportById(id),
      getReports(),
      getTeamInfo(),
    ]);

    const idx = allReports.findIndex((r) => r.id === id);
    const prevReport = idx > 0 ? allReports[idx - 1] : null;
    const nextReport = idx < allReports.length - 1 ? allReports[idx + 1] : null;

    return (
      <ReportDetailContent
        report={report}
        prevReport={prevReport}
        nextReport={nextReport}
        team={team}
      />
    );
  } catch (e) {
    notFound();
  }
}

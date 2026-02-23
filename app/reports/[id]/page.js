import { getReportById, getReports } from '@/lib/microcms';
import ReportDetailContent from '@/components/ReportDetailContent';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function ReportDetailPage({ params }) {
  const { id } = await params;

  try {
    const [report, allReports] = await Promise.all([
      getReportById(id),
      getReports(),
    ]);

    const idx = allReports.findIndex((r) => r.id === id);
    const prevReport = idx > 0 ? allReports[idx - 1] : null;
    const nextReport = idx < allReports.length - 1 ? allReports[idx + 1] : null;

    return (
      <ReportDetailContent
        report={report}
        prevReport={prevReport}
        nextReport={nextReport}
      />
    );
  } catch (e) {
    notFound();
  }
}
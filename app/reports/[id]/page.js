'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categoryStyle, formatDate } from '@/lib/styles';
import { reportDetail, reports } from '@/lib/data';

/* ===== Lightbox (Portal) ===== */
function Lightbox({ caption, color, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.88)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        cursor: 'pointer',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      {/* 閉じるボタン */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '560px',
        height: '55vh',
        maxHeight: '400px',
        background: `linear-gradient(135deg, ${color}20, ${color}40)`,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" opacity="0.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>{caption}</p>
      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', marginTop: '8px' }}>タップで閉じる</div>
    </div>,
    document.body
  );
}

/* ===== Image Placeholder with Lightbox ===== */
function ImagePlaceholder({ caption, index }) {
  const colors = ['#0066FF', '#00B4D8', '#FF1744', '#FF9100'];
  const c = colors[index % colors.length];
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <figure
        onClick={() => setExpanded(true)}
        style={{ margin: '24px 0', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
      >
        <div style={{ height: '200px', background: `linear-gradient(135deg, ${c}15, ${c}30)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.2" opacity="0.4"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '9px', padding: '3px 8px', borderRadius: '4px', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
            タップで拡大
          </div>
        </div>
        <figcaption style={{ background: '#fff', padding: '10px 14px', fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
          {caption}
        </figcaption>
      </figure>

      {expanded && <Lightbox caption={caption} color={c} onClose={() => setExpanded(false)} />}
    </>
  );
}

/* ===== Score Board ===== */
function ScoreBoard({ home, away, homeScore, awayScore, innings }) {
  const homeInnings = innings.slice(0, 7);
  const awayInnings = innings.slice(8, 15);

  return (
    <div style={{ margin: '24px 0', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', background: '#fff' }}>
      <div style={{ background: 'linear-gradient(90deg, #0052D4, #0066FF)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '14px' }}>⚾</span>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', color: '#FFD600', letterSpacing: '2px' }}>SCORE BOARD</span>
      </div>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', minWidth: '360px', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ background: '#F8F9FA' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 800, color: '#555', fontSize: '11px', width: '120px' }}>チーム</th>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <th key={n} style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#aaa', fontSize: '10px', width: '28px' }}>{n}</th>
              ))}
              <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 900, color: '#0052D4', fontSize: '13px', background: '#F0F4FF' }}>計</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: '1px solid #F0F0F0' }}>
              <td style={{ padding: '10px 12px', fontWeight: 900, color: '#0052D4', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0066FF' }} />{home}
                </div>
              </td>
              {homeInnings.slice(0, 6).map((s, i) => (
                <td key={i} style={{ padding: '10px 6px', textAlign: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: s !== '0' ? '#FF1744' : '#ccc' }}>{s}</td>
              ))}
              <td style={{ padding: '10px 12px', textAlign: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', fontWeight: 700, color: '#0052D4', background: '#F0F4FF' }}>{homeScore}</td>
            </tr>
            <tr style={{ borderTop: '1px solid #F0F0F0' }}>
              <td style={{ padding: '10px 12px', fontWeight: 900, color: '#555', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF9100' }} />{away}
                </div>
              </td>
              {awayInnings.slice(0, 6).map((s, i) => (
                <td key={i} style={{ padding: '10px 6px', textAlign: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: s !== '0' ? '#FF1744' : '#ccc' }}>{s}</td>
              ))}
              <td style={{ padding: '10px 12px', textAlign: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', fontWeight: 700, color: '#555', background: '#F0F4FF' }}>{awayScore}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ background: homeScore > awayScore ? 'linear-gradient(90deg, #00C85310, #00C85305)' : 'linear-gradient(90deg, #FF174410, #FF174405)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid #F0F0F0' }}>
        <span style={{ background: homeScore > awayScore ? '#00C853' : '#FF1744', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 10px', borderRadius: '4px' }}>{homeScore > awayScore ? 'WIN' : 'LOSE'}</span>
        <span style={{ fontSize: '12px', color: '#666', fontWeight: 700 }}>{home} {homeScore} - {awayScore} {away}</span>
      </div>
    </div>
  );
}

/* ===== Main Page ===== */
export default function ReportDetailPage({ params }) {
  const report = reportDetail;
  const cat = categoryStyle(report.category);
  const dateStr = formatDate(report.date).display;

  // Find prev/next
  const idx = reports.findIndex((r) => r.id === report.id);
  const prevReport = idx > 0 ? reports[idx - 1] : null;
  const nextReport = idx < reports.length - 1 ? reports[idx + 1] : null;

  return (
    <>
      <Header current="活動報告" />

      {/* Article Hero */}
      <section style={{ background: `linear-gradient(135deg, ${cat.bg}DD 0%, ${cat.bg} 100%)`, padding: '32px 20px 48px', position: 'relative', overflow: 'hidden' }}>
        <div className="stripe-bg" />
        <div className="fade-up" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>
            <Link href="/" style={{ transition: 'color 0.2s' }}>ホーム</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/reports" style={{ transition: 'color 0.2s' }}>活動報告</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#fff' }}>記事詳細</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '6px', backdropFilter: 'blur(4px)', letterSpacing: '1px' }}>{cat.icon} {report.category}</span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 700 }}>{dateStr}</span>
          </div>
          <h1 className="fade-up-1" style={{ fontSize: '24px', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.5, textShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>{report.title}</h1>
        </div>
      </section>

      {/* Article Body */}
      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
        <article className="fade-up-2" style={{ background: '#fff', borderRadius: '16px', padding: '28px 22px', marginTop: '-24px', position: 'relative', zIndex: 10, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          {report.body.map((block, i) => {
            if (block.type === 'text') {
              return <p key={i} style={{ fontSize: '14px', color: '#444', lineHeight: 2.1, margin: '0 0 18px 0' }}>{block.content}</p>;
            }
            if (block.type === 'heading') {
              return <h2 key={i} style={{ fontSize: '16px', fontWeight: 900, color: '#222', margin: '32px 0 14px 0', padding: '0 0 8px 0', borderBottom: '3px solid', borderImage: 'linear-gradient(90deg, #0066FF, #00E5FF) 1', display: 'inline-block', width: '100%' }}>{block.content}</h2>;
            }
            if (block.type === 'image') {
              return <ImagePlaceholder key={i} caption={block.caption} index={block.index} />;
            }
            if (block.type === 'score') {
              return <ScoreBoard key={i} {...block} />;
            }
            return null;
          })}
        </article>

        {/* Share bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 0' }}>
          <span style={{ fontSize: '10px', color: '#aaa', fontWeight: 700, letterSpacing: '2px', marginRight: '4px' }}>SHARE</span>
          {[
            { label: 'LINE', color: '#06C755', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.48 2 2 5.95 2 10.7c0 4.26 3.66 7.84 8.61 8.52.34.07.79.22.91.51.1.26.07.67.03.93l-.15.91c-.04.26-.2 1.02.89.56 1.09-.47 5.88-3.46 8.03-5.93C22.18 14.16 22 12.5 22 10.7 22 5.95 17.52 2 12 2z" /></svg> },
            { label: 'X', color: '#000', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
            { label: 'コピー', color: '#666', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg> },
          ].map((s) => (
            <button key={s.label} className="share-btn" style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 3px 10px ${s.color}33` }} title={s.label}>{s.icon}</button>
          ))}
        </div>

        {/* Prev / Next */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingBottom: '32px' }}>
          {prevReport ? (
            <Link href={`/reports/${prevReport.id}`} className="nav-card" style={{ background: '#fff', borderRadius: '12px', padding: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderTop: `3px solid ${categoryStyle(prevReport.category).bg}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                <span style={{ fontSize: '9px', color: '#aaa', fontWeight: 800, letterSpacing: '2px' }}>PREV</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '8px', fontWeight: 800, background: categoryStyle(prevReport.category).bg, color: '#fff', padding: '2px 6px', borderRadius: '3px' }}>{prevReport.category}</span>
                <span style={{ fontSize: '10px', color: '#bbb' }}>{prevReport.date}</span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 900, color: '#333', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{prevReport.title}</div>
            </Link>
          ) : <div />}

          {nextReport ? (
            <Link href={`/reports/${nextReport.id}`} className="nav-card" style={{ background: '#fff', borderRadius: '12px', padding: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderTop: `3px solid ${categoryStyle(nextReport.category).bg}`, textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginBottom: '8px' }}>
                <span style={{ fontSize: '9px', color: '#aaa', fontWeight: 800, letterSpacing: '2px' }}>NEXT</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', color: '#bbb' }}>{nextReport.date}</span>
                <span style={{ fontSize: '8px', fontWeight: 800, background: categoryStyle(nextReport.category).bg, color: '#fff', padding: '2px 6px', borderRadius: '3px' }}>{nextReport.category}</span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 900, color: '#333', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{nextReport.title}</div>
            </Link>
          ) : <div />}
        </div>

        {/* Back to list */}
        <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
          <Link href="/reports" className="cta-btn" style={{ display: 'inline-block', padding: '12px 32px', borderRadius: '30px', background: 'linear-gradient(90deg, #0052D4, #0066FF)', color: '#fff', fontSize: '13px', fontWeight: 800, letterSpacing: '1px', boxShadow: '0 4px 16px rgba(0,82,212,0.25)' }}>← 活動報告一覧に戻る</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

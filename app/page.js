'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BaseballIcon from '@/components/BaseballIcon';
import { categoryStyle, positionColor, gradeColor } from '@/lib/styles';
import { reports, players as allPlayers, coaches } from '@/lib/data';

const topReports = reports.slice(0, 4);
const topMembers = allPlayers.slice(0, 6);

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeMemberGrade, setActiveMemberGrade] = useState('all');
  const [expandedPlayer, setExpandedPlayer] = useState(null);

  const filteredReports = activeTab === 'all' ? topReports : topReports.filter((r) => r.category === activeTab);
  const filteredMembers = activeMemberGrade === 'all' ? topMembers : topMembers.filter((m) => m.grade === activeMemberGrade);
  const grades = ['all', ...Array.from(new Set(topMembers.map((m) => m.grade)))];

  return (
    <>
      <Header />

      {/* ===== HERO ===== */}
      <section id="top" className="fade-up" style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0052D4 0%, #0066FF 30%, #00B4D8 70%, #00E5FF 100%)',
        minHeight: '440px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 24px 60px',
        overflow: 'hidden',
      }}>
        <div className="stripe-bg" />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,214,0,0.2), transparent 70%)', top: '-80px', right: '-60px', animation: 'heroGlow 4s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '30px', right: '30px', opacity: 0.12, color: '#fff', animation: 'float 6s ease-in-out infinite' }}>
          <BaseballIcon size={100} />
        </div>

        <div className="fade-up-1" style={{ width: '300px', height: '190px', background: 'rgba(255,255,255,0.12)', borderRadius: '16px', border: '3px dashed rgba(255,255,255,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', gap: '10px', marginBottom: '28px', backdropFilter: 'blur(8px)' }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
          <span style={{ fontSize: '12px', opacity: 0.6 }}>チーム集合写真</span>
        </div>

        <div className="fade-up-2" style={{ display: 'inline-block', background: '#FFD600', color: '#0052D4', fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '6px', padding: '4px 20px', borderRadius: '4px', marginBottom: '12px', boxShadow: '0 4px 16px rgba(255,214,0,0.3)' }}>YOUR TEAM</div>
        <h1 className="fade-up-2" style={{ fontSize: '34px', fontWeight: 900, color: '#fff', textAlign: 'center', margin: '0 0 16px 0', lineHeight: 1.3, textShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>〇〇<br />少年野球クラブ</h1>
        <p className="fade-up-3" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', textAlign: 'center', fontWeight: 700, margin: 0 }}>「楽しく、真剣に、仲間とともに」</p>
        <p className="fade-up-3" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', textAlign: 'center', margin: '8px 0 0 0' }}>野球を通じて子どもたちの成長を応援します</p>
        <div className="fade-up-4" style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.5 }}>
          <span style={{ fontSize: '10px', color: '#fff', letterSpacing: '2px' }}>SCROLL</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* ===== TEAM INFO CARDS ===== */}
      <section style={{ padding: '0 20px', marginTop: '-28px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { icon: '🕐', label: '活動日時', value: '毎週 土・日\n9:00〜12:00', accent: '#0066FF' },
            { icon: '📍', label: '活動場所', value: '〇〇市立○○小\nグラウンド', accent: '#00C853' },
            { icon: '👦', label: '対象', value: '小学\n1年生〜6年生', accent: '#FF9100' },
            { icon: '📞', label: '連絡先', value: '090-XXXX-XXXX\n代表 山田', accent: '#FF1744' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', borderTop: `4px solid ${item.accent}`, animation: `fadeInUp 0.5s ease ${i * 0.08}s both` }}>
              <div style={{ fontSize: '20px', marginBottom: '6px' }}>{item.icon}</div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: item.accent, letterSpacing: '2px', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '12px', color: '#333', lineHeight: 1.6, fontWeight: 700, whiteSpace: 'pre-line' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== チーム紹介 ===== */}
      <section style={{ padding: '48px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '6px', height: '28px', background: 'linear-gradient(180deg, #FF1744, #FF9100)', borderRadius: '3px' }} />
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: '#0052D4', letterSpacing: '3px', lineHeight: 1 }}>ABOUT</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#333', letterSpacing: '3px' }}>チーム紹介</div>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: 'linear-gradient(135deg, #0066FF11, #00E5FF22)', borderRadius: '0 16px 0 80px' }} />
          <p style={{ fontSize: '14px', color: '#444', lineHeight: 2.1, margin: '0 0 14px 0' }}>〇〇少年野球クラブは、2015年に設立された少年野球チームです。「楽しく、真剣に、仲間とともに」をモットーに、野球の技術だけでなく、礼儀やチームワークの大切さを学んでいます。</p>
          <p style={{ fontSize: '14px', color: '#444', lineHeight: 2.1, margin: 0 }}>現在、小学1年生から6年生まで約25名の選手が在籍。毎週末の練習と月2〜3回の試合・交流戦に参加しています。体験入団は随時受付中です。お気軽にお問い合わせください。</p>
        </div>
      </section>

      {/* ===== 活動報告 ===== */}
      <section id="reports" style={{ padding: '48px 20px 56px', background: 'linear-gradient(180deg, #fff 0%, #F0F4FF 100%)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '6px', height: '28px', background: 'linear-gradient(180deg, #0066FF, #00E5FF)', borderRadius: '3px' }} />
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: '#0052D4', letterSpacing: '3px', lineHeight: 1 }}>REPORTS</div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#333', letterSpacing: '3px' }}>活動報告</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {[
              { key: 'all', label: 'すべて', color: '#0066FF' },
              { key: '試合', label: '⚾ 試合', color: '#FF1744' },
              { key: '練習', label: '💪 練習', color: '#00C853' },
              { key: 'イベント', label: '🎉 イベント', color: '#FF9100' },
            ].map((tab) => (
              <button key={tab.key} className="filter-btn" onClick={() => setActiveTab(tab.key)} style={{ padding: '7px 18px', borderRadius: '24px', border: 'none', background: activeTab === tab.key ? tab.color : '#E8E8E8', color: activeTab === tab.key ? '#fff' : '#777', fontSize: '12px', fontWeight: 800, boxShadow: activeTab === tab.key ? `0 4px 12px ${tab.color}44` : 'none' }}>{tab.label}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredReports.map((report, i) => {
              const cat = categoryStyle(report.category);
              return (
                <Link key={report.id} href={`/reports/${report.id}`} className="report-card" style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', display: 'flex', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
                  <div style={{ width: '110px', minHeight: '110px', background: `linear-gradient(135deg, ${cat.bg}22, ${cat.bg}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={cat.bg} strokeWidth="1.5" opacity="0.4"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', background: cat.bg, borderRadius: '12px 0 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>{cat.icon}</div>
                  </div>
                  <div style={{ padding: '14px 16px', flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '6px', background: cat.bg, color: cat.text, fontSize: '10px', fontWeight: 800, letterSpacing: '1px' }}>{report.category}</span>
                      <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 600 }}>{report.date}</span>
                    </div>
                    <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#222', margin: '0 0 6px 0', lineHeight: 1.4 }}>{report.title}</h3>
                    <p style={{ fontSize: '12px', color: '#888', margin: 0, lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{report.body}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link href="/reports" className="cta-btn" style={{ display: 'inline-block', padding: '14px 36px', borderRadius: '30px', background: 'linear-gradient(90deg, #0052D4, #0066FF)', color: '#fff', fontSize: '13px', fontWeight: 800, letterSpacing: '1px', boxShadow: '0 4px 16px rgba(0,82,212,0.3)' }}>活動報告をもっと見る →</Link>
          </div>
        </div>
      </section>

      {/* ===== メンバー紹介 ===== */}
      <section id="members" style={{ padding: '48px 20px 56px', background: '#F5F5F5', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,23,68,0.06), transparent 70%)' }} />
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '6px', height: '28px', background: 'linear-gradient(180deg, #FF1744, #FF5252)', borderRadius: '3px' }} />
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: '#FF1744', letterSpacing: '3px', lineHeight: 1 }}>MEMBERS</div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#333', letterSpacing: '3px' }}>メンバー紹介</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {grades.map((g) => {
              const gc = g !== 'all' ? gradeColor(g) : { bg: '#333', text: '#fff' };
              return (
                <button key={g} className="filter-btn" onClick={() => { setActiveMemberGrade(g); setExpandedPlayer(null); }} style={{ padding: '6px 14px', borderRadius: '20px', border: 'none', background: activeMemberGrade === g ? gc.bg : '#E8E8E8', color: activeMemberGrade === g ? gc.text : '#888', fontSize: '11px', fontWeight: 800, boxShadow: activeMemberGrade === g ? `0 3px 10px ${gc.bg}33` : 'none' }}>{g === 'all' ? '全学年' : g}</button>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {filteredMembers.map((player, i) => {
              const gc = gradeColor(player.grade);
              const pc = positionColor(player.position);
              const isExpanded = expandedPlayer === player.number;
              return (
                <div key={player.number} className="player-card" onClick={() => setExpandedPlayer(isExpanded ? null : player.number)} style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: isExpanded ? '0 12px 32px rgba(0,82,212,0.15)' : '0 2px 10px rgba(0,0,0,0.05)', animation: `scaleIn 0.4s ease ${i * 0.05}s both`, border: isExpanded ? '2px solid #0066FF' : '2px solid transparent' }}>
                  <div style={{ height: '130px', background: 'linear-gradient(135deg, #0052D4, #0066FF, #00B4D8)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div className="stripe-bg-dense" />
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg>
                    <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#FFD600', color: '#0052D4', fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(0,0,0,0.25)', lineHeight: 1 }}>{player.number}</div>
                    <div style={{ position: 'absolute', top: '10px', right: '8px', background: gc.bg, color: gc.text, fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '10px', boxShadow: `0 2px 6px ${gc.bg}44`, letterSpacing: '1px' }}>{player.grade}</div>
                    {player.role && <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(255,214,0,0.9)', color: '#0052D4', fontSize: '9px', fontWeight: 900, padding: '3px 10px', borderRadius: '6px', letterSpacing: '1px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>★ {player.role}</div>}
                  </div>
                  <div style={{ padding: '14px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#222', marginBottom: '6px', lineHeight: 1.2 }}>{player.name}</div>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <span style={{ fontSize: '10px', background: `${pc}15`, color: pc, padding: '2px 8px', borderRadius: '4px', fontWeight: 800, border: `1px solid ${pc}30` }}>{player.position}</span>
                      <span style={{ fontSize: '10px', background: '#F5F5F5', color: '#777', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>{player.throwBat}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#FF1744', fontWeight: 800, lineHeight: 1.4 }}>「{player.comment}」</div>
                    {isExpanded && (
                      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '2px dashed #E8E8E8', animation: 'fadeInUp 0.3s ease both' }}>
                        <div style={{ fontSize: '9px', fontWeight: 800, color: '#0066FF', letterSpacing: '2px', marginBottom: '8px' }}>SEASON STATS</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                          {[{ label: '出場', value: player.stats.games }, { label: '安打', value: player.stats.hits }, { label: '打率', value: player.stats.avg }].map((stat) => (
                            <div key={stat.label} style={{ background: '#F0F4FF', borderRadius: '8px', padding: '8px 4px', textAlign: 'center' }}>
                              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#0052D4', lineHeight: 1 }}>{stat.value}</div>
                              <div style={{ fontSize: '8px', color: '#999', fontWeight: 700, marginTop: '2px', letterSpacing: '1px' }}>{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', gap: '4px' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">{isExpanded ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}</svg>
                      <span style={{ fontSize: '9px', color: '#ccc', fontWeight: 700 }}>{isExpanded ? '閉じる' : '成績を見る'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coaches */}
          <div style={{ marginTop: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '6px', height: '22px', background: 'linear-gradient(180deg, #FF9100, #FFD600)', borderRadius: '3px' }} />
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#FF9100', letterSpacing: '3px', lineHeight: 1 }}>COACHING STAFF</div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#333', letterSpacing: '3px' }}>監督・コーチ</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {coaches.map((coach, i) => (
                <div key={i} className="coach-card" style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', display: 'flex', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
                  <div style={{ width: '80px', flexShrink: 0, background: coach.role === '監督' ? 'linear-gradient(135deg, #FF9100, #FFB74D)' : 'linear-gradient(135deg, #0052D4, #42A5F5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', position: 'relative', overflow: 'hidden' }}>
                    <div className="stripe-bg-dense" />
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg>
                    <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', position: 'relative', letterSpacing: '1px' }}>{coach.role}</span>
                  </div>
                  <div style={{ padding: '14px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#222' }}>{coach.name}</span>
                      <span style={{ fontSize: '10px', color: '#bbb', fontWeight: 700 }}>{coach.since}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.7, margin: 0 }}>{coach.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link href="/members" className="cta-btn" style={{ display: 'inline-block', padding: '14px 36px', borderRadius: '30px', background: 'linear-gradient(90deg, #FF1744, #FF5252)', color: '#fff', fontSize: '13px', fontWeight: 800, letterSpacing: '1px', boxShadow: '0 4px 16px rgba(255,23,68,0.3)' }}>メンバー紹介をもっと見る →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BaseballIcon from '@/components/BaseballIcon';
import { positionColor, gradeColor } from '@/lib/styles';

export default function MembersContent({ players, coaches, team }) {
  const [activeGrade, setActiveGrade] = useState('all');
  const [expandedPlayer, setExpandedPlayer] = useState(null);

  // 学年リストを動的に生成
  const gradeOrder = ['6年', '5年', '4年', '3年', '2年', '1年'];
  const existingGrades = gradeOrder.filter((g) => players.some((p) => p.grade === g));
  const grades = ['all', ...existingGrades];

  const filtered = activeGrade === 'all' ? players : players.filter((p) => p.grade === activeGrade);
  const countByGrade = (g) => players.filter((p) => p.grade === g).length;

  return (
    <>
      <Header current="メンバー" team={team} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #FF1744 0%, #FF5252 40%, #FF8A80 100%)', padding: '40px 20px 56px', position: 'relative', overflow: 'hidden' }}>
        <div className="stripe-bg" />
        <div style={{ position: 'absolute', top: '10px', right: '20px', opacity: 0.1, color: '#fff', animation: 'float 6s ease-in-out infinite' }}>
          <BaseballIcon size={120} />
        </div>

        <div className="fade-up" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
            <Link href="/" style={{ transition: 'color 0.2s' }}>ホーム</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#fff' }}>メンバー紹介</span>
          </div>

          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '42px', color: '#fff', letterSpacing: '4px', lineHeight: 1, marginBottom: '4px', textShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>MEMBERS</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: 'rgba(255,255,255,0.9)', letterSpacing: '4px' }}>メンバー紹介</div>

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: '#FFD600', lineHeight: 1 }}>{players.length}</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '1px' }}>選手</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: '#FFD600', lineHeight: 1 }}>{coaches.length}</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '1px' }}>スタッフ</div>
            </div>
            {existingGrades.map((g) => (
              <div key={g} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: '#fff', lineHeight: 1 }}>{countByGrade(g)}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '1px' }}>{g}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Players */}
      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
        {/* Filter */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '14px 16px', marginTop: '-24px', position: 'relative', zIndex: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#999', letterSpacing: '1px', marginRight: '2px' }}>学年</span>
          {grades.map((g) => {
            const gc = g !== 'all' ? gradeColor(g) : { bg: '#333', text: '#fff' };
            return (
              <button key={g} className="filter-btn" onClick={() => { setActiveGrade(g); setExpandedPlayer(null); }} style={{ padding: '6px 14px', borderRadius: '20px', border: 'none', background: activeGrade === g ? gc.bg : '#F0F0F0', color: activeGrade === g ? gc.text : '#888', fontSize: '11px', fontWeight: 800, boxShadow: activeGrade === g ? `0 3px 10px ${gc.bg}33` : 'none' }}>
                {g === 'all' ? `全員 (${players.length})` : `${g} (${countByGrade(g)})`}
              </button>
            );
          })}
        </div>

        <div style={{ padding: '18px 4px 12px', fontSize: '12px', color: '#999', fontWeight: 700 }}>{filtered.length} 名の選手</div>

        {/* Player cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingBottom: '16px' }}>
          {filtered.map((player, i) => {
            const gc = gradeColor(player.grade);
            const pc = positionColor(player.position || '');
            const isExpanded = expandedPlayer === player.id;

            return (
              <div key={player.id} className="player-card" onClick={() => setExpandedPlayer(isExpanded ? null : player.id)} style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: isExpanded ? '0 12px 32px rgba(0,82,212,0.15)' : '0 2px 10px rgba(0,0,0,0.05)', animation: `scaleIn 0.4s ease ${i * 0.05}s both`, border: isExpanded ? '2px solid #0066FF' : '2px solid transparent' }}>
                {/* Photo */}
                {player.photo ? (
                  <div style={{ height: '130px', position: 'relative', overflow: 'hidden' }}>
                    <img src={player.photo} alt={player.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {player.number && <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#FFD600', color: '#0052D4', fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(0,0,0,0.25)', lineHeight: 1 }}>{player.number}</div>}
                    <div style={{ position: 'absolute', top: '10px', right: '8px', background: gc.bg, color: gc.text, fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '10px', boxShadow: `0 2px 6px ${gc.bg}44`, letterSpacing: '1px' }}>{player.grade}</div>
                    {player.role && <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(255,214,0,0.9)', color: '#0052D4', fontSize: '9px', fontWeight: 900, padding: '3px 10px', borderRadius: '6px', letterSpacing: '1px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>★ {player.role}</div>}
                  </div>
                ) : (
                  <div style={{ height: '130px', background: 'linear-gradient(135deg, #0052D4, #0066FF, #00B4D8)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div className="stripe-bg-dense" />
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg>
                    {player.number && <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#FFD600', color: '#0052D4', fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(0,0,0,0.25)', lineHeight: 1 }}>{player.number}</div>}
                    <div style={{ position: 'absolute', top: '10px', right: '8px', background: gc.bg, color: gc.text, fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '10px', boxShadow: `0 2px 6px ${gc.bg}44`, letterSpacing: '1px' }}>{player.grade}</div>
                    {player.role && <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(255,214,0,0.9)', color: '#0052D4', fontSize: '9px', fontWeight: 900, padding: '3px 10px', borderRadius: '6px', letterSpacing: '1px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>★ {player.role}</div>}
                  </div>
                )}

                {/* Info */}
                <div style={{ padding: '14px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: '#222', marginBottom: '6px', lineHeight: 1.2 }}>{player.name}</div>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {player.position && <span style={{ fontSize: '10px', background: `${pc}15`, color: pc, padding: '2px 8px', borderRadius: '4px', fontWeight: 800, border: `1px solid ${pc}30` }}>{player.position}</span>}
                    {player.throwBat && <span style={{ fontSize: '10px', background: '#F5F5F5', color: '#777', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>{player.throwBat}</span>}
                  </div>
                  {player.comment && <div style={{ fontSize: '12px', color: '#FF1744', fontWeight: 800, lineHeight: 1.4 }}>「{player.comment}」</div>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Coaches */}
      <section style={{ padding: '40px 20px 48px', background: 'linear-gradient(180deg, #fff 0%, #F0F4FF 100%)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '6px', height: '28px', background: 'linear-gradient(180deg, #FF9100, #FFD600)', borderRadius: '3px' }} />
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: '#FF9100', letterSpacing: '3px', lineHeight: 1 }}>COACHING STAFF</div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#333', letterSpacing: '3px' }}>監督・コーチ</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {coaches.map((coach, i) => (
              <div key={coach.id} className="coach-card" style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', display: 'flex', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
                <div style={{ width: '90px', flexShrink: 0, background: coach.role === '監督' ? 'linear-gradient(135deg, #FF9100, #FFB74D)' : 'linear-gradient(135deg, #0052D4, #42A5F5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', position: 'relative', overflow: 'hidden' }}>
                  <div className="stripe-bg-dense" />
                  {coach.photo ? (
                    <img src={coach.photo} alt={coach.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                  ) : (
                    <>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg>
                      <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '9px', fontWeight: 800, padding: '2px 10px', borderRadius: '10px', position: 'relative', letterSpacing: '1px' }}>{coach.role}</span>
                    </>
                  )}
                </div>
                <div style={{ padding: '16px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 900, color: '#222' }}>{coach.name}</span>
                    {coach.role && <span style={{ fontSize: '10px', background: coach.role === '監督' ? '#FF9100' : '#0066FF', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>{coach.role}</span>}
                  </div>
                  {coach.comment && <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.8, margin: 0 }}>{coach.comment}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section style={{ padding: '48px 20px', background: '#F5F5F5' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'linear-gradient(135deg, #0052D4, #0066FF, #00B4D8)', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,82,212,0.25)' }}>
          <div className="stripe-bg" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', background: '#FFD600', borderRadius: '50%', width: '52px', height: '52px', alignItems: 'center', justifyContent: 'center', color: '#0052D4', marginBottom: '16px', boxShadow: '0 4px 16px rgba(255,214,0,0.4)' }}>
              <BaseballIcon size={30} />
            </div>
            {team.recruitTitle && <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', margin: '0 0 8px 0', lineHeight: 1.4 }}>{team.recruitTitle}</h3>}
            {team.recruitMessage && (
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, margin: '0 0 20px 0', whiteSpace: 'pre-line' }}>
                {team.recruitMessage}
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              {team.contactInfo && (
                <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px 20px', backdropFilter: 'blur(4px)', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '2px' }}>お問い合わせ</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#FFD600', letterSpacing: '2px', whiteSpace: 'pre-line' }}>{team.contactInfo}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                {team.schedule && (
                  <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>活動日時</div>
                    <div style={{ fontSize: '11px', color: '#fff', fontWeight: 800, marginTop: '2px' }}>{team.schedule}</div>
                  </div>
                )}
                {team.location && (
                  <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>場所</div>
                    <div style={{ fontSize: '11px', color: '#fff', fontWeight: 800, marginTop: '2px' }}>{team.location}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer team={team} />
    </>
  );
}
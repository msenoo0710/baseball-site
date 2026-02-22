'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BaseballIcon from '@/components/BaseballIcon';
import { positionColor, gradeColor } from '@/lib/styles';
import { players, coaches } from '@/lib/data';

const grades = ['all', '6年', '5年', '4年', '3年', '2年'];

export default function MembersPage() {
  const [activeGrade, setActiveGrade] = useState('all');
  const [expandedPlayer, setExpandedPlayer] = useState(null);

  const filtered = activeGrade === 'all' ? players : players.filter((p) => p.grade === activeGrade);
  const countByGrade = (g) => players.filter((p) => p.grade === g).length;

  return (
    <>
      <Header current="メンバー" />

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
            {grades.slice(1).map((g) => (
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
            const pc = positionColor(player.position);
            const isExpanded = expandedPlayer === player.number;

            return (
              <div key={player.number} className="player-card" onClick={() => setExpandedPlayer(isExpanded ? null : player.number)} style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: isExpanded ? '0 12px 32px rgba(0,82,212,0.15)' : '0 2px 10px rgba(0,0,0,0.05)', animation: `scaleIn 0.4s ease ${i * 0.05}s both`, border: isExpanded ? '2px solid #0066FF' : '2px solid transparent' }}>
                {/* Photo */}
                <div style={{ height: '130px', background: 'linear-gradient(135deg, #0052D4, #0066FF, #00B4D8)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div className="stripe-bg-dense" />
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#FFD600', color: '#0052D4', fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(0,0,0,0.25)', lineHeight: 1 }}>{player.number}</div>
                  <div style={{ position: 'absolute', top: '10px', right: '8px', background: gc.bg, color: gc.text, fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '10px', boxShadow: `0 2px 6px ${gc.bg}44`, letterSpacing: '1px' }}>{player.grade}</div>
                  {player.role && <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(255,214,0,0.9)', color: '#0052D4', fontSize: '9px', fontWeight: 900, padding: '3px 10px', borderRadius: '6px', letterSpacing: '1px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>★ {player.role}</div>}
                </div>

                {/* Info */}
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
                        {[
                          { label: '出場', value: player.stats.games },
                          { label: '安打', value: player.stats.hits },
                          { label: '打率', value: player.stats.avg },
                        ].map((stat) => (
                          <div key={stat.label} style={{ background: '#F0F4FF', borderRadius: '8px', padding: '8px 4px', textAlign: 'center' }}>
                            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#0052D4', lineHeight: 1 }}>{stat.value}</div>
                            <div style={{ fontSize: '8px', color: '#999', fontWeight: 700, marginTop: '2px', letterSpacing: '1px' }}>{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', gap: '4px' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                      {isExpanded ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
                    </svg>
                    <span style={{ fontSize: '9px', color: '#ccc', fontWeight: 700 }}>{isExpanded ? '閉じる' : '成績を見る'}</span>
                  </div>
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
              <div key={i} className="coach-card" style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', display: 'flex', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
                <div style={{ width: '90px', flexShrink: 0, background: coach.role === '監督' ? 'linear-gradient(135deg, #FF9100, #FFB74D)' : 'linear-gradient(135deg, #0052D4, #42A5F5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', position: 'relative', overflow: 'hidden' }}>
                  <div className="stripe-bg-dense" />
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg>
                  <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '9px', fontWeight: 800, padding: '2px 10px', borderRadius: '10px', position: 'relative', letterSpacing: '1px' }}>{coach.role}</span>
                </div>
                <div style={{ padding: '16px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 900, color: '#222' }}>{coach.name}</span>
                    <span style={{ fontSize: '10px', color: '#bbb', fontWeight: 700 }}>{coach.since}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.8, margin: 0 }}>{coach.comment}</p>
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
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', margin: '0 0 8px 0', lineHeight: 1.4 }}>一緒に野球しよう！</h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, margin: '0 0 20px 0' }}>
              〇〇では新しい仲間を募集しています。<br />
              小学1〜6年生ならだれでも大歓迎！<br />
              体験入団は随時受付中です。
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px 20px', backdropFilter: 'blur(4px)', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '2px' }}>お問い合わせ</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#FFD600', letterSpacing: '2px' }}>090-XXXX-XXXX</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>代表 山田</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>活動日時</div>
                  <div style={{ fontSize: '11px', color: '#fff', fontWeight: 800, marginTop: '2px' }}>毎週 土・日 9:00〜12:00</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>場所</div>
                  <div style={{ fontSize: '11px', color: '#fff', fontWeight: 800, marginTop: '2px' }}>○○小学校グラウンド</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

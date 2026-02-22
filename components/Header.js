'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BaseballIcon from './BaseballIcon';

export default function Header({ current = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { label: 'ホーム', href: '/', icon: '🏠' },
    { label: '活動報告', href: '/reports', icon: '📝' },
    { label: 'メンバー', href: '/members', icon: '👥' },
  ];

  return (
    <>
      <header
        style={{
          background: 'linear-gradient(90deg, #0052D4, #0066FF)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 200,
          boxShadow: '0 4px 20px rgba(0,82,212,0.3)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden', flexShrink: 1, minWidth: 0 }}>
          <div
            style={{
              background: '#FFD600',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              minWidth: '36px',
              minHeight: '36px',
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0052D4',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(255,214,0,0.4)',
            }}
          >
            <BaseballIcon size={22} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '9px',
                color: '#FFD600',
                letterSpacing: '3px',
                whiteSpace: 'nowrap',
              }}
            >
              YOUR TEAM
            </div>
            <div style={{ fontSize: '11px', color: '#fff', fontWeight: 900, marginTop: '-1px', whiteSpace: 'nowrap' }}>
              〇〇少年野球クラブ
            </div>
          </div>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
          style={{
            background: menuOpen ? 'rgba(255,255,255,0.15)' : 'transparent',
            border: 'none',
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: menuOpen ? '0px' : '5px',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
            transition: 'background 0.2s ease',
            position: 'relative',
          }}
        >
          <span style={{
            display: 'block', width: '20px', height: '2px', background: '#fff', borderRadius: '1px',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(45deg)' : 'none',
            position: menuOpen ? 'absolute' : 'relative',
          }} />
          <span style={{
            display: 'block', width: '20px', height: '2px', background: '#fff', borderRadius: '1px',
            transition: 'all 0.3s ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '20px', height: '2px', background: '#fff', borderRadius: '1px',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(-45deg)' : 'none',
            position: menuOpen ? 'absolute' : 'relative',
          }} />
        </button>
      </header>

      {/* オーバーレイ */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 190,
            animation: 'fadeIn 0.2s ease',
          }}
        />
      )}

      {/* スライドメニュー */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '260px',
          height: '100vh',
          background: 'linear-gradient(180deg, #0052D4, #003CA8)',
          zIndex: 195,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '80px',
          boxShadow: menuOpen ? '-8px 0 32px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {navItems.map((item) => {
          const isActive = item.label === current;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 24px',
                color: isActive ? '#FFD600' : 'rgba(255,255,255,0.85)',
                fontSize: '15px',
                fontWeight: 800,
                letterSpacing: '2px',
                background: isActive ? 'rgba(255,214,0,0.1)' : 'transparent',
                borderLeft: isActive ? '4px solid #FFD600' : '4px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        <div style={{ marginTop: 'auto', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{
              background: '#FFD600', borderRadius: '50%', width: '28px', height: '28px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0052D4',
            }}>
              <BaseballIcon size={16} />
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '10px', color: '#FFD600', letterSpacing: '2px' }}>
              YOUR TEAM
            </div>
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            〇〇市立○○小学校グラウンド<br />
            毎週 土・日 9:00〜12:00
          </div>
        </div>
      </nav>
    </>
  );
}

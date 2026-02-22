import BaseballIcon from './BaseballIcon';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #0052D4, #0040A8)',
        padding: '40px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="stripe-bg-thin" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex',
            background: '#FFD600',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0052D4',
            marginBottom: '12px',
            boxShadow: '0 4px 16px rgba(255,214,0,0.3)',
          }}
        >
          <BaseballIcon size={28} />
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '14px',
            color: '#FFD600',
            letterSpacing: '5px',
            marginBottom: '2px',
          }}
        >
          YOUR TEAM
        </div>
        <div style={{ fontSize: '14px', color: '#fff', fontWeight: 900, marginBottom: '20px' }}>
          〇〇少年野球クラブ
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 2 }}>
          活動場所：〇〇市立○○小学校グラウンド
          <br />
          活動日時：毎週 土・日 9:00〜12:00
          <br />
          お問い合わせ：090-XXXX-XXXX（代表 山田）
        </div>
        <div
          style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.2)',
            marginTop: '24px',
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '3px',
          }}
        >
          © 2025 YOUR TEAM BASEBALL CLUB
        </div>
      </div>
    </footer>
  );
}

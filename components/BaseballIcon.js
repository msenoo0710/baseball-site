export default function BaseballIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ display: 'block', flexShrink: 0, width: size, height: size }}>
      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 8 Q24 20 20 32 Q16 44 20 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 8 Q40 20 44 32 Q48 44 44 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="12" x2="22" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="18" x2="21" y2="19" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="24" x2="20" y2="24" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="40" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="46" x2="21" y2="45" stroke="currentColor" strokeWidth="1.5" />
      <line x1="18" y1="52" x2="22" y2="50" stroke="currentColor" strokeWidth="1.5" />
      <line x1="42" y1="14" x2="46" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="43" y1="19" x2="48" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <line x1="44" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="1.5" />
      <line x1="44" y1="40" x2="48" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <line x1="43" y1="45" x2="48" y2="46" stroke="currentColor" strokeWidth="1.5" />
      <line x1="42" y1="50" x2="46" y2="52" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

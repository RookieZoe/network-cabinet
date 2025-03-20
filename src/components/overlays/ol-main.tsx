export default function OverlayMain() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '20px',
        zIndex: 10000,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          fontSize: '24px',
          fontWeight: 'bold',
          userSelect: 'none'
        }}
      >
        <a
          href='https://github.com/RookieZoe/network-cabinet'
          style={{ color: '#ffffff', textDecoration: 'none' }}
          target='_blank'
        >
          Network Cabinet
        </a>
        <div style={{ fontSize: '18px', color: '#999', marginTop: '8px' }}>
          Still Working 🚧
        </div>
      </div>
    </div>
  );
}

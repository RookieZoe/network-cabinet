import './global.less';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import NetworkCabinet from './components/network-cabinet';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <div style={{ fontSize: '18px', textAlign: 'center', padding: '16px' }}>
      <h1>
        <a href='https://github.com/RookieZoe/network-cabinet'>Network Cabinet</a>
      </h1>
      <h2>Still Working 🚧</h2>
    </div>
    <NetworkCabinet />
  </StrictMode>
);

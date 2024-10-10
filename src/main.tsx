import './global.less';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { DemoFiber } from './components/demo.fiber';
import { Demo } from './components/demo';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <DemoFiber />
    <div style={{ borderTop: '1px solid' }}></div>
    <Demo />
  </StrictMode>
);

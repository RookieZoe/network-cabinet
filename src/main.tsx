import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './global.less';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <div>todo</div>
  </StrictMode>
);

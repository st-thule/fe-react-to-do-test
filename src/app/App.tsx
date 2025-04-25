import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Page } from '@app/pages/Page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>
);

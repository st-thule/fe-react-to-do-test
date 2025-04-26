import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@shared/components/layouts/Header';
export const Page = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

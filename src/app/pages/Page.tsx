import React from 'react';
import { Outlet } from 'react-router-dom';

export const Page = () => {
  return (
    <>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

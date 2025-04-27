import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@shared/components/layouts/Header';
import { SideBar } from '@shared/components/layouts/Sidebar';
import { ModalComponent } from '@shared/components/partials/Modal';
export const Page = () => {
  return (
    <>
      <Header />
      <div className="page-content">
        <SideBar />
        <main className="main">
          <Outlet />
        </main>
      </div>
      <ModalComponent />
    </>
  );
};

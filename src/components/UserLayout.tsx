import React from 'react';
import { Outlet } from 'react-router';
import { AnnouncementModal } from './AnnouncementModal';

export function UserLayout() {
  return (
    <>
      <AnnouncementModal />
      <Outlet />
    </>
  );
}

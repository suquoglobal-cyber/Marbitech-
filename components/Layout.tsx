
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ToastContainer from './ToastContainer';
import AIConsultant from './AIConsultant';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-[#FAF9F6] flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <AIConsultant />
      <ToastContainer />
    </div>
  );
};

export default Layout;

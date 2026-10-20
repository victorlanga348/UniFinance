/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { useFinance } from '../../contexts/FinanceContext';

// Import All Page views
import { Dashboard } from '../../pages/Dashboard';
import { Transactions } from '../../pages/Transactions';
import { BudgetsPage } from '../../pages/BudgetsPage';
import { GoalsPage } from '../../pages/GoalsPage';
import { EducationPage } from '../../pages/EducationPage';
import { ProfilePage } from '../../pages/ProfilePage';
import { SettingsPage } from '../../pages/SettingsPage';
import { AdminDashboard } from '../../pages/AdminDashboard';

export const AppLayout: React.FC = () => {
  const { activePage } = useFinance();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dynamic router based on global context state
  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
      case 'income':
      case 'expenses':
      case 'reports':
        return <Transactions />;
      case 'budgets':
        return <BudgetsPage />;
      case 'goals':
        return <GoalsPage />;
      case 'education':
        return <EducationPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0A0F1D] text-slate-800 dark:text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation Column */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Primary Work Zone containing top header and layout canvas */}
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Scrollable Layout Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {renderActivePage()}
          </div>
        </main>
      </div>
    </div>
  );
};

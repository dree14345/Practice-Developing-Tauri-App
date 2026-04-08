import React from "react";
import Sidebar from "../components/Sidebar";
import { TopNav } from "../components/TopNav";
import { StatCard } from "../components/StatCard";
import { ActivityFeed } from "../components/ActivityFeed";
import { FeaturedProject } from "../components/FeaturedProject";
import { Footer } from "../components/Footer";
import { DollarSign, Zap, UserPlus, Calendar, Download } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <Sidebar />
      <TopNav />

      <main className="ml-64 pt-24 pb-12 px-8">
        {children}

        <Footer footerText={"This is made by DREE"} />
      </main>
    </div>
  );
};

export default DashboardLayout;

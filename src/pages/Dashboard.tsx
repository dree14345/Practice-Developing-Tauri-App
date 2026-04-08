import { Calendar, DollarSign, Download, UserPlus, Zap } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { StatCard } from "../components/StatCard";
import { ActivityFeed } from "../components/ActivityFeed";
import { FeaturedProject } from "../components/FeaturedProject";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <section className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Overview
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Here is the pulse of your current projects.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
            <Calendar size={16} /> Last 30 Days
          </button>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Stats Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <StatCard
            label="Total Revenue"
            value="$428,900"
            trend="+12.5%"
            icon={<DollarSign size={20} />}
          />
          <StatCard
            label="Active Projects"
            value="24"
            variant="dark"
            icon={<Zap size={20} />}
          />
          <StatCard
            label="New Users"
            value="1,204"
            trend="+4%"
            icon={<UserPlus size={20} />}
          />
        </div>

        {/* Chart Placeholder (Reuse previous MomentumChart here) */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-[2.5rem] p-8 shadow-sm min-h-[400px]">
          {/* [MomentumChart Component here] */}
          <div className="h-full flex items-center justify-center text-slate-300 italic font-medium">
            Momentum Visualization
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <ActivityFeed />
        </div>

        <div className="col-span-12 lg:col-span-5">
          <FeaturedProject />
        </div>
      </div>
    </DashboardLayout>
  );
}

import React from "react";
import { ExternalLink } from "lucide-react";

const activities = [
  {
    id: 1,
    name: "Sarah Chen",
    action: "approved the final structural drafts for",
    target: "Neo-Zenith Plaza",
    time: "2 hours ago",
    type: "Design Review",
  },
  {
    id: 2,
    name: "Marcus Thorne",
    action: "uploaded 12 new high-res renders for the",
    target: "Arctic Pavilion",
    time: "5 hours ago",
    type: "Asset Update",
  },
];

export const ActivityFeed: React.FC = () => (
  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm h-full">
    <div className="flex justify-between items-center mb-8">
      <h4 className="text-xl font-bold text-slate-900">Team Activity</h4>
      <button className="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-slate-900">
        View All Logs
      </button>
    </div>
    <div className="space-y-6">
      {activities.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0 border border-slate-200" />
          <div className="flex-1">
            <p className="text-sm text-slate-600">
              <span className="font-bold text-slate-900">{item.name}</span>{" "}
              {item.action}{" "}
              <span className="font-bold text-slate-900">{item.target}</span>.
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {item.time} • {item.type}
            </p>
          </div>
          <ExternalLink
            size={14}
            className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      ))}
    </div>
  </div>
);

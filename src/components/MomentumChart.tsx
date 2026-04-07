import React from "react";

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
const data = [
  { design: 40, execution: 60 },
  { design: 55, execution: 45 },
  { design: 70, execution: 50 },
  { design: 65, execution: 75 },
  { design: 85, execution: 40 },
  { design: 90, execution: 60 },
];

const MomentumChart = () => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-xl font-bold text-slate-900">Project Momentum</h4>
          <p className="text-slate-500 text-xs mt-1">
            Completion rate across all active domains
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-900"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Design
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-300"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Execution
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-64 w-full flex items-end gap-2">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-t border-slate-100"></div>
          ))}
        </div>

        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-col justify-end items-center gap-1 group h-full cursor-pointer"
          >
            <div
              style={{ height: `${item.design}%` }}
              className="w-full bg-slate-900 rounded-t-lg transition-all group-hover:opacity-80"
            />
            <div
              style={{ height: `${item.execution}%` }}
              className="w-full bg-slate-300 rounded-t-lg transition-all group-hover:opacity-80"
            />
            <span className="text-[9px] font-bold text-slate-500 mt-2">
              {months[idx]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MomentumChart;

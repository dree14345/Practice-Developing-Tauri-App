import React from "react";

interface FooterProps {
  footerText: string;
}

export const Footer: React.FC<FooterProps> = ({ footerText }) => (
  <footer className="mt-12 py-8 text-center border-t border-slate-100">
    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 opacity-60">
      {footerText}
    </p>
  </footer>
);

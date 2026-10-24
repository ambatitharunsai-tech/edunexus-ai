import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
        <Compass className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900">Page Not Found</h2>
        <p className="text-sm text-slate-500 max-w-sm">
          The requested route does not exist or has been moved within the EduNexus AI platform.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 shadow-sm transition-colors cursor-pointer"
      >
        <Home className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

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
      <Link to="/">
        <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};

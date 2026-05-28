import { ReactNode } from 'react';

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  filters?: ReactNode;
  actions?: ReactNode;
}

export function FilterBar({ searchPlaceholder = "Search...", searchValue = "", onSearchChange, filters, actions }: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
      <div className="flex-1 w-full flex flex-col sm:flex-row gap-4 items-center">
        {onSearchChange && (
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
            />
          </div>
        )}
        {filters && (
          <div className="flex gap-2 flex-wrap">
            {filters}
          </div>
        )}
      </div>
      {actions && (
        <div className="flex gap-2 w-full md:w-auto shrink-0 justify-end">
          {actions}
        </div>
      )}
    </div>
  );
}

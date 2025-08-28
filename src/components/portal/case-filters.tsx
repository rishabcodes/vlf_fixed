'use client';

interface FilterState {
  status: string[];
  practiceArea: string;
  dateRange: {
    start: string;
    end: string;
  } | null;
}

interface CaseFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function CaseFilters({ filters, onFiltersChange }: CaseFiltersProps) {
  const statusOptions = [
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'on_hold', label: 'On Hold', color: 'orange' },
    { value: 'closed', label: 'Closed', color: 'gray' },
  ];

  const practiceAreas = [
    { value: '', label: 'All Practice Areas' },
    { value: 'immigration', label: 'Immigration' },
    { value: 'criminal_defense', label: 'Criminal Defense' },
    { value: 'family_law', label: 'Family Law' },
    { value: 'personal_injury', label: 'Personal Injury' },
    { value: 'workers_compensation', label: 'Workers Compensation' },
  ];

  const toggleStatus = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    
    onFiltersChange({ ...filters, status: newStatuses });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: [],
      practiceArea: '',
      dateRange: null,
    });
  };

  const hasActiveFilters = 
    filters.status.length > 0 || 
    filters.practiceArea !== '' || 
    filters.dateRange !== null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => {
              const isActive = filters.status.includes(option.value);
              return (
                <button
                  key={option.value}

                onClick={() => toggleStatus(option.value)}

                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? `bg-${option.color}-100 text-${option.color}-800`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                  {isActive && (
                    <svg className="ml-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Practice Area Filter */}
        <div>
          <label htmlFor="practice-area" className="block text-sm font-medium text-gray-700 mb-2">
            Practice Area
          </label>
          <select
            id="practice-area"
            value={filters.practiceArea} onChange={(e) => onFiltersChange({ ...filters, practiceArea: e.target.value })}

                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {practiceAreas.map((area) => (
              <option key={area.value}

                value={area.value}>
                {area.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="start-date" className="sr-only">
                Start date
              </label>
              <input
                type="date"
                id="start-date"
                value={filters.dateRange?.start || ''} onChange={(e) => {
                  const start = e.target.value;
                  const end = filters.dateRange?.end || '';
                  onFiltersChange({
                    ...filters,
                    dateRange: start || end ? { start, end } : null,
                  }); className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Start date"
              />
            </div>
            <div>
              <label htmlFor="end-date" className="sr-only">
                End date
              </label>
              <input
                type="date"
                id="end-date"
                value={filters.dateRange?.end || ''} onChange={(e) => {
                  const end = e.target.value;
                  const start = filters.dateRange?.start || '';
                  onFiltersChange({
                    ...filters,
                    dateRange: start || end ? { start, end } : null,
                  }); className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="End date"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}
}
}
}

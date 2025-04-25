import React from 'react';
import { FilterIcon, ArrowDownUp } from 'lucide-react';
import { FilterState } from '../types/doctor';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (name: string, value: string | string[]) => void;
  consultationTypes: string[];
  specialties: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  consultationTypes,
  specialties,
}) => {
  const handleConsultationTypeChange = (type: string) => {
    onFilterChange('consultationType', type);
  };

  const handleSpecialtyChange = (specialty: string) => {
    const currentSpecialties = [...filters.specialties];
    const index = currentSpecialties.indexOf(specialty);
    
    if (index === -1) {
      currentSpecialties.push(specialty);
    } else {
      currentSpecialties.splice(index, 1);
    }
    
    onFilterChange('specialties', currentSpecialties);
  };

  const handleSortChange = (sortValue: string) => {
    if (sortValue === filters.sortBy) {
      onFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc');
    } else if (sortValue === 'fees' || sortValue === 'experience') {
      onFilterChange('sortBy', sortValue);
      onFilterChange('sortOrder', 'asc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center mb-3">
        <FilterIcon className="h-5 w-5 text-emerald-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Consultation Type</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                filters.consultationType === ''
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
              }`}
              onClick={() => handleConsultationTypeChange('')}
            >
              All
            </button>
            {consultationTypes.map((type) => (
              <button
                key={type}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  filters.consultationType === type
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
                }`}
                onClick={() => handleConsultationTypeChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Specialties</h3>
          <div className="grid grid-cols-2 gap-2">
            {specialties.map((specialty) => (
              <div key={specialty} className="flex items-center">
                <input
                  id={`specialty-${specialty}`}
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  checked={filters.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                />
                <label
                  htmlFor={`specialty-${specialty}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
          <div className="flex gap-2">
            <button
              className={`flex items-center px-3 py-1.5 text-sm rounded-md border transition-colors ${
                filters.sortBy === 'fees'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
              }`}
              onClick={() => handleSortChange('fees')}
            >
              Fees
              {filters.sortBy === 'fees' && (
                <ArrowDownUp className={`h-4 w-4 ml-1 ${filters.sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
              )}
            </button>
            <button
              className={`flex items-center px-3 py-1.5 text-sm rounded-md border transition-colors ${
                filters.sortBy === 'experience'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
              }`}
              onClick={() => handleSortChange('experience')}
            >
              Experience
              {filters.sortBy === 'experience' && (
                <ArrowDownUp className={`h-4 w-4 ml-1 ${filters.sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
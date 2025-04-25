import React, { useState, useEffect } from 'react';
import { fetchDoctors, getAllSpecialties, getAllConsultationTypes } from './api/doctorsApi';
import { Doctor, FilterState, Appointment } from './types/doctor';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import AppointmentHistory from './components/AppointmentHistory';
import { Stethoscope, ClipboardList } from 'lucide-react';

function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [doctorNames, setDoctorNames] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [consultationTypes, setConsultationTypes] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showAppointments, setShowAppointments] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    consultationType: '',
    specialties: [],
    sortBy: '',
    sortOrder: 'asc'
  });

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
        setDoctorNames(data.map(doctor => doctor.name));
        setSpecialties(getAllSpecialties(data));
        setConsultationTypes(getAllConsultationTypes(data));
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, doctors]);

  const applyFilters = () => {
    let result = [...doctors];

    if (filters.searchTerm) {
      result = result.filter(doctor =>
        doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.consultationType) {
      result = result.filter(doctor =>
        doctor.consultationType.includes(filters.consultationType)
      );
    }

    if (filters.specialties.length > 0) {
      result = result.filter(doctor =>
        filters.specialties.some(specialty => doctor.specialty.includes(specialty))
      );
    }

    if (filters.sortBy) {
      result.sort((a, b) => {
        const aValue = a[filters.sortBy];
        const bValue = b[filters.sortBy];
        const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
        
        return (aValue - bValue) * multiplier;
      });
    }

    setFilteredDoctors(result);
  };

  const handleFilterChange = (name: string, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (value: string) => {
    handleFilterChange('searchTerm', value);
  };

  const handleAppointmentBooked = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-emerald-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">DocConnect</h1>
            </div>
            <button
              onClick={() => setShowAppointments(!showAppointments)}
              className="flex items-center px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-md hover:bg-emerald-200 transition-colors"
            >
              <ClipboardList className="h-5 w-5 mr-2" />
              {showAppointments ? 'Show Doctors' : 'My Appointments'}
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAppointments ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">My Appointments</h2>
            <AppointmentHistory appointments={appointments} />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Find the Right Doctor</h2>
              <SearchBar 
                searchTerm={filters.searchTerm} 
                onSearchChange={handleSearchChange}
                suggestions={doctorNames}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <FilterPanel 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  consultationTypes={consultationTypes}
                  specialties={specialties}
                />
              </div>
              
              <div className="md:col-span-2">
                <div className="mb-4 bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {loading ? 'Loading doctors...' : `${filteredDoctors.length} doctors found`}
                    </h2>
                  </div>
                </div>
                
                <DoctorList 
                  doctors={filteredDoctors} 
                  loading={loading} 
                  onAppointmentBooked={handleAppointmentBooked}
                />
              </div>
            </div>
          </>
        )}
      </main>
      
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 DocConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
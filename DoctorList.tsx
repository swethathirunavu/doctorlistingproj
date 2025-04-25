import React from 'react';
import { Doctor, Appointment } from '../types/doctor';
import DoctorCard from './DoctorCard';

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
  onAppointmentBooked: (appointment: Appointment) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, loading, onAppointmentBooked }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No doctors found</h3>
        <p className="text-gray-600">Please try different search criteria or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {doctors.map((doctor) => (
        <DoctorCard 
          key={doctor.id} 
          doctor={doctor} 
          onAppointmentBooked={onAppointmentBooked}
        />
      ))}
    </div>
  );
};

export default DoctorList;
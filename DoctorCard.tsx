import React, { useState } from 'react';
import { Doctor, Appointment } from '../types/doctor';
import { Calendar, DollarSign, Star, Award, Phone, Video } from 'lucide-react';
import AppointmentModal from './AppointmentModal';

interface DoctorCardProps {
  doctor: Doctor;
  onAppointmentBooked: (appointment: Appointment) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onAppointmentBooked }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition-all hover:shadow-md">
      <div className="md:flex">
        <div className="md:w-1/4 h-48 md:h-auto">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 md:w-3/4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
              <div className="flex items-center mt-1 text-gray-600 space-x-1">
                <Award className="h-4 w-4 text-emerald-600" />
                <span className="text-sm">{doctor.specialty.join(', ')}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-500" />
              <span className="ml-1 font-semibold">{doctor.rating}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center text-gray-700">
              <Award className="h-4 w-4 text-gray-500 mr-2" />
              <span>{doctor.experience} years experience</span>
            </div>
            <div className="flex items-center text-gray-700">
              <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
              <span>${doctor.fees} per consult</span>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Available Consultation</p>
            <div className="flex flex-wrap gap-2">
              {doctor.consultationType.includes('In-person') && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  In-person
                </span>
              )}
              {doctor.consultationType.includes('Video') && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                  <Video className="h-3 w-3 mr-1" />
                  Video
                </span>
              )}
              {doctor.consultationType.includes('Phone') && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                  <Phone className="h-3 w-3 mr-1" />
                  Phone
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1 text-emerald-600" />
              <span>Available: {doctor.availability.join(', ')}</span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      
      <AppointmentModal
        doctor={doctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAppointmentBooked={onAppointmentBooked}
      />
    </div>
  );
};

export default DoctorCard;
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Doctor, AppointmentFormData, Appointment } from '../types/doctor';

interface AppointmentModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
  onAppointmentBooked: (appointment: Appointment) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ 
  doctor, 
  isOpen, 
  onClose,
  onAppointmentBooked 
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    date: '',
    time: '',
    type: doctor.consultationType[0],
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAppointment: Appointment = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      doctorId: doctor.id,
      doctorName: doctor.name,
      status: 'upcoming',
      createdAt: new Date().toISOString()
    };
    
    onAppointmentBooked(newAppointment);
    setIsSubmitting(false);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getAvailableTimes = () => {
    const times = [];
    for (let i = 9; i <= 17; i++) {
      times.push(`${i}:00`);
      if (i !== 17) times.push(`${i}:30`);
    }
    return times;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Book Appointment with {doctor.name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200"
              required
            >
              <option value="">Select time</option>
              {getAvailableTimes().map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consultation Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200"
              required
            >
              {doctor.consultationType.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200"
              placeholder="Any specific concerns or notes for the doctor..."
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Consultation fee: ${doctor.fees}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
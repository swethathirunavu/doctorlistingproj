import React from 'react';
import { Calendar, Clock, Video, Phone, User, FileText } from 'lucide-react';
import { Appointment } from '../types/doctor';

interface AppointmentHistoryProps {
  appointments: Appointment[];
}

const AppointmentHistory: React.FC<AppointmentHistoryProps> = ({ appointments }) => {
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No appointments yet</h3>
        <p className="mt-1 text-sm text-gray-500">Book your first appointment with a doctor.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedAppointments.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(appointment.date).toLocaleDateString()}
                <Clock className="h-4 w-4 ml-3 mr-1" />
                {appointment.time}
              </div>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                appointment.status
              )}`}
            >
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              {appointment.type === 'Video' ? (
                <Video className="h-4 w-4 mr-2 text-emerald-600" />
              ) : appointment.type === 'Phone' ? (
                <Phone className="h-4 w-4 mr-2 text-emerald-600" />
              ) : (
                <User className="h-4 w-4 mr-2 text-emerald-600" />
              )}
              {appointment.type} Consultation
            </div>
            {appointment.notes && (
              <div className="flex items-start col-span-2">
                <FileText className="h-4 w-4 mr-2 text-emerald-600 mt-0.5" />
                <p className="text-gray-600">{appointment.notes}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentHistory;
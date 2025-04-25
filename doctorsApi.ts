// Mock API service to fetch doctor data
// In a real application, this would be replaced with actual API calls

import { Doctor } from '../types/doctor';

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: ['Cardiology', 'Internal Medicine'],
    consultationType: ['In-person', 'Video'],
    experience: 12,
    fees: 150,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    availability: ['Mon', 'Wed', 'Fri']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: ['Neurology'],
    consultationType: ['In-person'],
    experience: 8,
    fees: 200,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    availability: ['Tue', 'Thu']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: ['Pediatrics'],
    consultationType: ['In-person', 'Video', 'Phone'],
    experience: 15,
    fees: 120,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: ['Orthopedics', 'Sports Medicine'],
    consultationType: ['In-person', 'Video'],
    experience: 20,
    fees: 250,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    availability: ['Mon', 'Wed', 'Fri']
  },
  {
    id: '5',
    name: 'Dr. Nina Patel',
    specialty: ['Dermatology'],
    consultationType: ['Video', 'Phone'],
    experience: 10,
    fees: 180,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    availability: ['Tue', 'Thu', 'Sat']
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialty: ['Psychiatry'],
    consultationType: ['Video', 'Phone'],
    experience: 18,
    fees: 220,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5207103/pexels-photo-5207103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  {
    id: '7',
    name: 'Dr. Lisa Thompson',
    specialty: ['Gynecology', 'Obstetrics'],
    consultationType: ['In-person', 'Video'],
    experience: 14,
    fees: 190,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    availability: ['Mon', 'Wed', 'Fri']
  },
  {
    id: '8',
    name: 'Dr. David Garcia',
    specialty: ['Ophthalmology'],
    consultationType: ['In-person'],
    experience: 22,
    fees: 210,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    availability: ['Tue', 'Thu']
  },
  {
    id: '9',
    name: 'Dr. Sophia Lee',
    specialty: ['Endocrinology', 'Internal Medicine'],
    consultationType: ['In-person', 'Video', 'Phone'],
    experience: 9,
    fees: 160,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    availability: ['Mon', 'Wed', 'Fri']
  },
  {
    id: '10',
    name: 'Dr. Mark Davis',
    specialty: ['Cardiology'],
    consultationType: ['In-person', 'Video'],
    experience: 25,
    fees: 280,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  }
];

export const fetchDoctors = (): Promise<Doctor[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockDoctors);
    }, 500);
  });
};

export const getAllSpecialties = (doctors: Doctor[]): string[] => {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    doctor.specialty.forEach(spec => {
      specialtiesSet.add(spec);
    });
  });
  
  return Array.from(specialtiesSet).sort();
};

export const getAllConsultationTypes = (doctors: Doctor[]): string[] => {
  const typesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    doctor.consultationType.forEach(type => {
      typesSet.add(type);
    });
  });
  
  return Array.from(typesSet).sort();
};
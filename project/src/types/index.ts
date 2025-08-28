export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  joinDate: string;
  occupation: string;
  emergencyContact: string;
  depositAmount: number;
  status: 'active' | 'inactive';
  photo?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt:string;
  

}

export interface RentDetail {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  paymentMethod: string;
  status: 'paid' | 'pending' | 'overdue';
  notes: string;
  date: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
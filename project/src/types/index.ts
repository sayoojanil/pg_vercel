export interface Guest {
  id: string;
  name: string;
  contact: string;
  location: string;
  dob: string;
  guardianName: string;
  guardianContact: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  email: string;
  amountPaid:string;
  paymentCycle:string;
  status:string;
  occupationCourse:string;
  joinDate: string;
  occupation: string;
  emergencyContactNumber: string;
  depositAmount: number;
  foodPreference: string;
  stayStatus: string;
  expectedDateFrom: string;
  expectedDateTo: string;
  fileUrl?: string;
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
  duedate: string;
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

// hai  
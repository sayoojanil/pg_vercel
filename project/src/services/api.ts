import { Guest, Review, RentDetail } from '../types';

// Base URL for the API
const BASE_URL = 'https://api-hammadii-6.onrender.com/';

// Helper function for API requests
async function apiRequest<T>(endpoint: string, method: string = 'GET', body?: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const guestAPI = {
  getAll: async (): Promise<Guest[]> => {
    return apiRequest<Guest[]>('/getDetailsof/guests');
  },
  
  getById: async (id: string): Promise<Guest | null> => {
    return apiRequest<Guest | null>(`/getDetailsof/guests/${id}`);
  },
  
  create: async (guest: Omit<Guest, 'id'>): Promise<Guest> => {
    return apiRequest<Guest>('/add/guests', 'POST', guest);
  },
  
  update: async (id: string, guest: Partial<Guest>): Promise<Guest | null> => {
    return apiRequest<Guest | null>(`/getDetailsof/guests/${id}`, 'PUT', guest);
  },
  
  delete: async (id: string): Promise<boolean> => {
    await apiRequest<void>(`/delete/guests/${id}`, 'DELETE');
    return true;
  }
};

export const reviewAPI = {
  getAll: async (): Promise<Review[]> => {
    return apiRequest<Review[]>('/reviews');
  },
  
  getById: async (id: string): Promise<Review | null> => {
    return apiRequest<Review | null>(`/reviews/${id}`);
  },
  
  create: async (review: Omit<Review, 'id'>): Promise<Review> => {
    return apiRequest<Review>('/reviews', 'POST', review);
  },
  
  update: async (id: string, review: Partial<Review>): Promise<Review | null> => {
    return apiRequest<Review | null>(`/reviews/${id}`, 'PUT', review);
  },
  
  delete: async (id: string): Promise<boolean> => {
    await apiRequest<void>(`/reviews/${id}`, 'DELETE');
    return true;
  }
};

export const rentAPI = {
  getAll: async (): Promise<RentDetail[]> => {
    return apiRequest<RentDetail[]>('/get/payments');
  },
  
  getById: async (id: string): Promise<RentDetail | null> => {
    return apiRequest<RentDetail | null>(`/payments/${id}`);
  },
  
  create: async (rent: Omit<RentDetail, 'id'>): Promise<RentDetail> => {
    return apiRequest<RentDetail>('/add/payments', 'POST', rent);
  },
  
  update: async (id: string, rent: Partial<RentDetail>): Promise<RentDetail | null> => {
    return apiRequest<RentDetail | null>(`/rent-details/${id}`, 'PUT', rent);
  },
  
  delete: async (id: string): Promise<boolean> => {
    await apiRequest<void>(`/rent-details/${id}`, 'DELETE');
    return true;
  }
};

export const loginAPI = {
  login: async (credentials: { email: string; password: string }): Promise<{ token: string; user: { id: string; email: string } }> => {
    return apiRequest<{ token: string; user: { id: string; email: string } }>('/loginWithEmail', 'POST', credentials);
  }
};
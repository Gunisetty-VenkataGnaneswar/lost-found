export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
}

export interface Item {
  _id: string;
  userId: {
    _id: string;
    displayName: string;
    email: string;
  };
  type: 'lost' | 'found';
  title: string;
  category: string;
  description: string;
  date: string;
  location: string;
  currentLocation?: string;
  images: string[];
  status: 'active' | 'claimed' | 'resolved';
  contactInfo: {
    email: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ItemFormData {
  type: 'lost' | 'found';
  title: string;
  category: string;
  description: string;
  date: string;
  location: string;
  currentLocation?: string;
  phoneNumber?: string;
  securityQuestions?: Array<{
    question: string;
    answer: string;
  }>;
}

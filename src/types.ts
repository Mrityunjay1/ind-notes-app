export interface User {
  token: string;
  refreshToken: string;
  email: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
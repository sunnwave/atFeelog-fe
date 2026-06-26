export interface User {
  id?: string; // legacy: _id, new: id
  name: string;
  email?: string;
  picture?: string;
  createdAt?: string;
}

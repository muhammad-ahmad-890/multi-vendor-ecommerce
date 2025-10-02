export interface User {
  id: string;
  userName: string;
  name: string;
  contactDetails: string;
  address: string;
  userType: "Registered" | "Guest";
  coins?: number;
  registrationDate: string;
  storeName?: string;
  status: "Active" | "Inactive";
}

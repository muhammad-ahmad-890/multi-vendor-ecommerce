export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Staff {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  avatar: string;
  permissions: string[];
}

export interface ICreateUser {
  email: string;
  name: string;
  address: string;
  role: "customer" | "seller"; // Extend roles as needed
  image?: string; // Optional field
  mobile: number; // Ensure the mobile number is valid
  password: string;
}

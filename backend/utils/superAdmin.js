import User from "../models/User.js";
import { hashedPassword } from "./passwordHasher.js";
import dotenv from "dotenv";

dotenv.config(); 

const adminInfo = {
  name: "Ritik",
  email: "ritik@gmail.com",
  role: "admin",
};

const password = process.env.ADMIN_PASSWORD;

export const superAdmin = async () => {
  try {
    if (!password) {
      throw new Error("ADMIN_PASSWORD is not defined in environment variables");
    }
    
    const admin = await User.findOne({ email: adminInfo.email }); 
    
    if (!admin) {
      await User.create({
        name: adminInfo.name,
        email: adminInfo.email,
        isActive: true, 
        password: await hashedPassword(password), 
        role: adminInfo.role,
      });
      console.log("Super admin created successfully");
    } else {
      console.log("Super admin already exists");
    }
  } catch (error) {
    console.error("Error creating super admin:", error);
  }
};

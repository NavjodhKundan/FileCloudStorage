import { z } from "zod";

//creating a zod schema that validates user info for signup
export const signupInfoVal = z.object({
    firstName: z.string().min(2, "First name should be atleast 2 character long").max(20),
    lastName: z.string().min(2, "last name should be atleast 2 character long").max(20),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password should be 8 character long")
    .max(32, "Password cannot exceed 32 character")
    .refine((val) => /[A-Z]/.test(val), "must contain atleast one uppercase")
    .refine((val) => /[a-z]/.test(val), "must contain atleast one lowercase")
    .refine((val) => /[0-9]/.test(val), "must contain atleast one number")
});

//creating a zod schema that validates user info for login
export const loginInfoVal = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "password cannot be empty")
});
import { z } from "zod";


const loginValidationZod = z.object({
    email: z.string().email(),
    password: z.string().min(6,{ message: "Password must be at least 6 characters long" }),
})


export const AuthZodValidation = {
    loginValidationZod
}
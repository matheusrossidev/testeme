import { z } from "zod";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, {
      message: "O assunto do teste tem que ter no mínimo 4 letras.",
    })
    .max(50, {
      message: "o assunto do teste não pode ultrapassar 50 letras.",
    }),
  type: z.enum(["mcq", "open_ended"]),
  amount: z.number().min(1).max(10),
});

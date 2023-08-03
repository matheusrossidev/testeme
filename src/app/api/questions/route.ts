import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { getQuestionsSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "You must be logged in to create a game." },
    //     {
    //       status: 401,
    //     }
    //   );
    // }
    const body = await req.json();
    const { amount, topic, type } = getQuestionsSchema.parse(body);
    let questions: any;
    if (type === "open_ended") {
      questions = await strict_output(
        "Você é uma IA útil que é capaz de gerar um par de perguntas e respostas, o comprimento de cada resposta não deve ser superior a 15 palavras, armazene todos os pares de respostas e perguntas em um JSON array",
        new Array(amount).fill(
          `Você deve gerar perguntas abertas aleatórias sobre ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
        }
      );
    } else if (type === "mcq") {
      questions = await strict_output(
        "Você é uma IA útil capaz de gerar perguntas e respostas de multipla escolha, o comprimento de cada resposta não deve ser superior a 15 palavras, armazenar todas as respostas, perguntas e opções em uma JSON array",
        new Array(amount).fill(
          `Você deve gerar uma pergunta hard mcq aleatória sobre ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
          option1: "option1 with max length of 15 words",
          option2: "option2 with max length of 15 words",
          option3: "option3 with max length of 15 words",
        }
      );
    }
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error("elle gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}

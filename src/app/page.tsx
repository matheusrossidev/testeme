import SignInButton from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Bem vindo ao TesteMe 🔥!</CardTitle>
          <CardDescription>
            A TesteMe é uma plataforma pra criar teste utilizando inteligência artificial! Pra começar é só clicar no botão abaixo e fazer o seu login!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Entrar com o Google" />
        </CardContent>
      </Card>
    </div>
  );
}

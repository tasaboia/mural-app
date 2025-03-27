import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SignInForm from "@/src/components/custom/auth/sign-in-form";

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Entrar</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <SignInForm />
      </div>
    </div>
  );
}

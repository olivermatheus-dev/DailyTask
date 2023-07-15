"use client";

import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push("/dashboard");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password.length < 6 || confirmPassword.length < 6) {
      setErrorMessage("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName,
        photoUrl: "URL_PADRAO_AQUI",
        taskIds: [],
      });

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("O e-mail já está cadastrado.");
      } else {
        setErrorMessage("Ocorreu um erro ao registrar a conta.");
      }
    }
  };
  return (
    <div className="flex h-screen items-center justify-center w-full sm:w-[700px] md:w-[850px] lg:w-[1200px]">
      <div className="-mt-20 w-11/12 sm:w-3/6 mx-auto overflow-hidden bg-white/70 rounded-lg shadow-md dark:bg-zinc-800/70">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-xl font-medium text-center text-indigo-700 dark:text-indigo-400">
            Crie sua Conta
          </h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Preencha as informações abaixo para se cadastrar.
          </p>

          <form onSubmit={handleRegister} className="mt-4">
            <div className="grid sm:grid-cols-2 gap-x-3">
              <div className="w-full mt-4">
                <input
                  required
                  type="text"
                  name="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Nome de Usuário"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-500 bg-white border rounded-lg dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>
              <div className="w-full mt-4">
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-500 bg-white border rounded-lg dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>
              <div className="w-full mt-4">
                <input
                  required
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  className="block w-full px-4 py-2 mt-2
                  text-gray-700 dark:text-gray-200 placeholder-gray-500 bg-white border rounded-lg dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>
              <div className="w-full mt-4">
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme a Senha"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-500 bg-white border rounded-lg dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="block w-full mt-6 px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-emerald-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Cadastrar
            </button>
            <p className="text-gray-600 dark:text-gray-300">
              Já possui uma conta?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Clique aqui para fazer login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

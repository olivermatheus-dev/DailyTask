"use client";

import { useState, useEffect } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/config/firebase/firebase";
import { useRouter } from "next/navigation";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.replace("/dashboard");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage("O email informado não está cadastrado.");
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-email"
      ) {
        setErrorMessage("Email ou senha incorretos.");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setPersistence(auth, browserSessionPersistence);
    try {
      const response = await signInWithPopup(auth, provider);
      await createUserDocIfNotExists(response.user);
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const createUserDocIfNotExists = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        taskIds: [],
      });
    }
  };

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center bg-secondary dark:bg-gray-900">
        <div className="h-3/6 w-3/6 flex gap-3 flex-col bg-gray-200 dark:bg-gray-700 rounded-md shadow-md items-center justify-center p-8">
          <h1 className="text-4xl text-primary dark:text-gray-100 mb-6">
            Login Page
          </h1>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="rounded-md px-4 py-2"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={handlePasswordChange}
              className="rounded-md px-4 py-2"
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              className="rounded-md bg-primary px-6 py-2 text-white dark:text-gray-800 font-semibold"
              onClick={handleLogin}
            >
              Fazer Login
            </button>
            <button
              className="rounded-md bg-primary px-6 py-2 text-white dark:text-gray-800 font-semibold"
              onClick={handleGoogleLogin}
            >
              Faça Login com o Google
            </button>
            <p className="text-gray-600 dark:text-gray-300">
              Ainda não tem uma conta?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Registre-se aqui.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

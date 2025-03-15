"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Alert } from "@heroui/alert";
import Btn from "@/components2/Btn";

const Reset = () => {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [tokenNotFound, setTokenNotFound] = useState(false);

  useEffect(() => {
    // On récupère l'email de l'utilisateur
    const params = new URLSearchParams(window.location.search);
    // On récupère le token de l'utilisateur
    const token = params.get("token");
    if (!token) {
      setTokenNotFound(true);
    }else{
      setToken(token);
    }
  }, []);

  return (
    <>
      {
        tokenNotFound && (
          <Alert
            variant={"bordered"}
            color="danger"
            description={"Le lien à expiré ou est invalide"}
            className="mb-4"
          />
        )
      }
      <Alert
            variant={"bordered"}
            color="primary"
            description={"La vérification n'est pas encore implémentée pour la démo"}
            className="mb-4"
          />
      <Btn
          type="submit"
          className="w-full"
          onPress={() => router.push("/login")}
          >
          Se connecter
        </Btn>
    </>
  );
};

export default Reset;

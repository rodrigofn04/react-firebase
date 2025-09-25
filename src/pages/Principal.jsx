import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Principal.css";

export default function Principal() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return <p>Carregando informações...</p>;
  }

  return (
    <div className="principal-container">
      <h2>Bem-vindo(a) à Página Principal</h2>
      {userData ? (
        <div className="user-info">
          <p><strong>Nome:</strong> {userData.nome}</p>
          <p><strong>Sobrenome:</strong> {userData.sobrenome}</p>
          <p><strong>Data de Nascimento:</strong> {userData.nascimento}</p>
        </div>
      ) : (
        <p>Dados não encontrados.</p>
      )}
      <button onClick={handleLogout} className="logout-button">
        Sair
      </button>
    </div>
  );
}

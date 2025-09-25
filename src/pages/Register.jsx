import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nome,
        sobrenome,
        nascimento,
        email,
      });

      navigate("/login");
    } catch (err) {
      setError("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          required
        />
        <input
          type="date"
          value={nascimento}
          onChange={(e) => setNascimento(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" className="register-button">
          Cadastrar
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

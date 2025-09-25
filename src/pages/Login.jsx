import React, { useState } from "react"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/principal");
    } catch (err) {
      setError("Usuário não encontrado ou senha incorreta.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // rota da página de cadastro
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}

      {/* Botão para redirecionar para cadastro */}
      <button 
        onClick={handleRegisterRedirect} 
        className="register-button"
      >
        Cadastre-se
      </button>
    </div>
  );
}

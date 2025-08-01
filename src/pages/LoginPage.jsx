import React, { useState } from "react";
import "../styles/Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // Simula login
    if (email === "test@test.com" && pass === "1234") {
      onLogin?.({ email });
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={e => setPass(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}


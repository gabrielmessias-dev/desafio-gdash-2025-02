import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Conecta no Backend (Docker)
      const res = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/";
    } catch (error) {
      alert("Login falhou! Tente: admin / 123456");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">🔐 Acesso Restrito</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" onClick={handleLogin}>
            Entrar
          </Button>
          <div className="text-xs text-center text-gray-400">
            Padrão: admin / 123456
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({ username: "", password: "" });

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/users");
    setUsers(res.data);
  };

  const createUser = async () => {
    if (!newUser.username || !newUser.password) return;
    await axios.post("http://localhost:3000/users", newUser);
    setNewUser({ username: "", password: "" });
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    if (confirm("Tem certeza?")) {
      await axios.delete(`http://localhost:3000/users/${id}`);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">👥 Gerenciar Usuários</h1>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            Voltar
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Novo Usuário</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              placeholder="Nome"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
            <Input
              placeholder="Senha"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <Button onClick={createUser}>Criar</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell>{u.username}</TableCell>
                    <TableCell>
                      {u.username !== "admin" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteUser(u._id)}
                        >
                          Remover
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

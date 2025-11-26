import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api"; // <--- Importe o api
import { useEffect, useState } from "react";

export default function PokemonPage() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await api.get(`/pokemon?page=${pageNum}`);
      setPokemons(res.data.results);
      setTotalPages(res.data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(1);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            🐉 Pokédex (Via Backend)
          </h1>
          <Button onClick={() => (window.location.href = "/")}>Voltar</Button>
        </div>
        {loading ? (
          <div className="text-center">Carregando...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {pokemons.map((poke) => (
              <Card
                key={poke.name}
                className="capitalize hover:bg-slate-100 transition cursor-pointer flex flex-col items-center p-4"
              >
                {/* IMAGEM DO POKEMON AQUI */}
                <img
                  src={poke.image}
                  alt={poke.name}
                  className="w-24 h-24 object-contain mb-2"
                />
                <CardHeader className="p-0">
                  <CardTitle className="text-center text-lg">
                    {poke.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
        <div className="flex justify-center gap-4 items-center">
          <Button
            onClick={() => fetchPokemons(page - 1)}
            disabled={page === 1}
            variant="outline"
          >
            Anterior
          </Button>
          <span>
            Página {page} de {totalPages}
          </span>
          <Button
            onClick={() => fetchPokemons(page + 1)}
            disabled={page === totalPages}
            variant="outline"
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}

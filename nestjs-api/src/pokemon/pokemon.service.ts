import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokemonService {
  // Busca lista paginada
  async findAll(page: number = 1) {
    const limit = 20;
    const offset = (page - 1) * limit;

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    );

    // Retorna dados formatados
    return {
      results: response.data.results,
      count: response.data.count,
      page: Number(page),
      totalPages: Math.ceil(response.data.count / limit),
    };
  }

  // Busca detalhes de um pokemon (Opcional, mas bom ter)
  async findOne(name: string) {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
    return {
      name: response.data.name,
      image: response.data.sprites.front_default,
      types: response.data.types.map((t: any) => t.type.name),
    };
  }
}

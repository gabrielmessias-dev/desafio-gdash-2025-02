import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { type Response } from 'express'; // Importe isso se der erro no tipo
import { Model } from 'mongoose';
import { Weather, WeatherDocument } from './schemas/weather.schema';


@Controller('weather')
export class WeatherController {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>,
  ) {}

  // Recebe dados do Go-Worker (Sem autenticação pois é comunicação interna)
  @Post()
  async create(@Body() data: any) {
    let insight = 'Clima estável.';
    if (data.temperature > 30) insight = '⚠️ Calor extremo! Hidrate-se.';
    else if (data.temperature < 18)
      insight = '❄️ Temperatura baixa. Leve um casaco.';
    if (data.windspeed > 20) insight += ' Ventos fortes detectados.';

    const createdWeather = new this.weatherModel({
      temperature: data.temperature,
      windspeed: data.windspeed,
      conditionCode: data.condition_code,
      aiInsight: insight,
    });

    return createdWeather.save();
  }

  // Lista para o Frontend (Protegido por JWT)
  // Se quiser testar sem login agora, remova a linha @UseGuards
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.weatherModel.find().sort({ createdAt: -1 }).limit(20).exec();
  }

  @Get('export/csv')
  async exportCsv(@Res() res: Response) {
    const data = await this.weatherModel
      .find()
      .sort({ createdAt: -1 })
      .limit(100)
      .exec();

    // Cabeçalho do CSV
    let csv = 'Data,Temperatura,Vento,Condicao,Insight\n';

    // Linhas
    data.forEach((row) => {
      const date = new Date(row['createdAt']).toISOString();
      // Sanitiza o texto para evitar quebras no CSV
      const insight = row.aiInsight.replace(/,/g, ';');

      csv += `${date},${row.temperature},${row.windspeed},${row.conditionCode},${insight}\n`;
    });

    // Configura o download
    res.header('Content-Type', 'text/csv');
    res.attachment('clima-export.csv');
    return res.send(csv);
  }
}

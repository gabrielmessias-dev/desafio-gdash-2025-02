import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Criar usuário
  @Post()
  async create(@Body() createUserDto: any) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // Listar usuários (Protegido)
  // @UseGuards(AuthGuard('jwt')) <--- Descomente depois para ativar segurança
  @Get()
  async findAll() {
    return this.userModel.find({}, { password: 0 }).exec(); // Não retorna a senha
  }

  // Deletar usuário
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}

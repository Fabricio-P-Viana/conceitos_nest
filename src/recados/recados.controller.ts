import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: { limit: number; offset: number }) {
    const { limit = 10, offset = 0 } = pagination;
    return 'todos os recados com limit ' + limit + ' e offset' + offset;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `um recado de id ${id}`;
  }

  @Post()
  create(@Body() body: any) {
    return `criado um recado ${JSON.stringify(body)}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return `atualizado o recado de id ${id} com ${JSON.stringify(body)}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `deletado o recado de id ${id}`;
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common'

@Controller('recados')
export class RecadosController {
  @Get()
  findAll() {
    return 'todos os recados'
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `um recado de id ${id}`
  }

  @Post()
  create(@Body() body: any) {
    return `criado um recado ${JSON.stringify(body)}`
  }
}

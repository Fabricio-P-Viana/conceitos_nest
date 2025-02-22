import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  // Req,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
// import { Request } from 'express';
import { UlrParam } from 'src/common/params/url-param.decorator';
import {
  ONLY_LOWERCASE_LETTERS_REGEX,
  REMOVE_SPACES_REGEX,
  SERVER_NAME,
} from './recados-constants';
import { RegexProtocol } from 'src/common/regex/regex-protocol.regex';
// import { ReqDataParam } from 'src/common/params/req-data-param.decorator';

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    @Inject(SERVER_NAME)
    private readonly serverName: string,
    @Inject(REMOVE_SPACES_REGEX)
    private readonly removeSpacesRegex: RegexProtocol,
    @Inject(ONLY_LOWERCASE_LETTERS_REGEX)
    private readonly onlyLowercaseLettersRegex: RegexProtocol,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto,
    @UlrParam() url: string, // decorator de parametro custom
    // @ReqDataParam('url') url:string, nesse decorator posso acessar qualquer parametro da data
  ) {
    console.log(url);

    const recados = await this.recadosService.findAll(paginationDto);
    return recados;
  }

  // @Get()
  // async findAll(@Query() paginationDto: PaginationDto, @Req() req: Request) {
  //   console.log(req['user']); // adicionado no middleware posso acessar por aqui

  //   // return `Retorna todos os recados. Limit=${limit}, Offset=${offset}.`;
  //   const recados = await this.recadosService.findAll(paginationDto);
  //   return recados;
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(+id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}

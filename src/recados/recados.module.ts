import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { Recado } from './entities/recado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import {
  ONLY_LOWERCASE_LETTERS_REGEX,
  REMOVE_SPACES_REGEX,
  SERVER_NAME,
} from './recados-constants';
import { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letter.regex';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), PessoasModule],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: SERVER_NAME,
      useValue: 'My Name Is NestJS',
    },
    {
      provide: ONLY_LOWERCASE_LETTERS_REGEX,
      useClass: OnlyLowercaseLettersRegex,
    },
    {
      provide: REMOVE_SPACES_REGEX,
      useClass: RemoveSpacesRegex,
    },
  ],
})
export class RecadosModule {}

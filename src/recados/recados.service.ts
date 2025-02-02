import { Injectable, NotFoundException } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: RecadoEntity[] = [
    {
      id: 1,
      texto: 'Olá, tudo bem?',
      de: 'João',
      para: 'Maria',
      lido: false,
      data: new Date(),
    },
  ];

  throwNotFoundException() {
    throw new NotFoundException('Recado não encontrado!');
  }

  findAll() {
    return this.recados;
  }

  findOne(id: string) {
    const recado = this.recados.find(recado => recado.id === +id);

    if (recado) return recado;

    // throw new HttpException('Recado não encontrado!', HttpStatus.NOT_FOUND);
    this.throwNotFoundException();
  }

  create(recado: RecadoEntity) {
    this.lastId++;
    const id = this.lastId;
    const novoRecado = { ...recado, id };
    this.recados.push(novoRecado);
    return novoRecado;
  }

  update(id: string, body: RecadoEntity) {
    const recadoExistenteIndex = this.recados.findIndex(
      recado => recado.id === +id,
    );

    if (recadoExistenteIndex < 0) this.throwNotFoundException();

    const recadoExistente = this.recados[recadoExistenteIndex];

    this.recados[recadoExistenteIndex] = {
      ...recadoExistente,
      ...body,
    };

    return this.recados[recadoExistenteIndex];
  }

  remove(id: string) {
    const recadoExistenteIndex = this.recados.findIndex(
      recado => recado.id === +id,
    );

    if (recadoExistenteIndex < 0) this.throwNotFoundException();

    const recado = this.recados[recadoExistenteIndex];

    this.recados.splice(recadoExistenteIndex, 1);

    return recado;
  }
}

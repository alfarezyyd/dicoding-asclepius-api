import { Injectable } from '@nestjs/common';
import { CreatePredictDto } from './dto/create-predict.dto';
import { UpdatePredictDto } from './dto/update-predict.dto';

@Injectable()
export class PredictService {
  create(createPredictDto: CreatePredictDto) {
    return 'This action adds a new predict';
  }

  findAll() {
    return `This action returns all predict`;
  }

  findOne(id: number) {
    return `This action returns a #${id} predict`;
  }

  update(id: number, updatePredictDto: UpdatePredictDto) {
    return `This action updates a #${id} predict`;
  }

  remove(id: number) {
    return `This action removes a #${id} predict`;
  }
}

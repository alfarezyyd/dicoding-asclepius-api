import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PredictService } from './predict.service';
import { CreatePredictDto } from './dto/create-predict.dto';
import { UpdatePredictDto } from './dto/update-predict.dto';

@Controller('predict')
export class PredictController {
  constructor(private readonly predictService: PredictService) {}

  @Post()
  create(@Body() createPredictDto: CreatePredictDto) {
    return this.predictService.create(createPredictDto);
  }

  @Get()
  findAll() {
    return this.predictService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predictService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePredictDto: UpdatePredictDto) {
    return this.predictService.update(+id, updatePredictDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predictService.remove(+id);
  }
}

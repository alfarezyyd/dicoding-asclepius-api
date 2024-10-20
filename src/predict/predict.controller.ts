import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PredictService } from './predict.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { WebResponse } from '../model/web.response';

@Controller('predict')
export class PredictController {
  constructor(private readonly predictService: PredictService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() imageFile: Express.Multer.File,
  ): Promise<WebResponse> {
    return {
      status: 'success',
      message: 'Model is predicted successfully',
      data: await this.predictService.handlePredict(imageFile),
    };
  }

  @Get()
  findAll() {
    return this.predictService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predictService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predictService.remove(+id);
  }
}

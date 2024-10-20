import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { PredictService } from './predict.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { WebResponse } from '../model/web.response';

import { Response } from 'express';

@Controller('predict')
export class PredictController {
  constructor(private readonly predictService: PredictService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() imageFile: Express.Multer.File,
    @Res() expressResponse: Response, // Menambahkan Response sebagai parameter
  ): Promise<WebResponse> {
    if (imageFile.size > 1000000) {
      expressResponse.status(413).json({
        // Mengatur status 413 dan mengembalikan respons JSON
        status: 'fail',
        message: 'Payload content length greater than maximum allowed: 1000000',
      });
    }
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

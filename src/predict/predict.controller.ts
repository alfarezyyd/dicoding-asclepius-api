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
import { Response } from 'express';

@Controller('predict')
export class PredictController {
  constructor(private readonly predictService: PredictService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() imageFile: Express.Multer.File,
    @Res() expressResponse: Response, // Menambahkan Response sebagai parameter
  ) {
    if (imageFile.size > 1000000) {
      return expressResponse.status(413).json({
        // Mengatur status 413 dan mengembalikan respons JSON
        status: 'fail',
        message: 'Payload content length greater than maximum allowed: 1000000',
      });
    }
    try {
      const resultPrediction =
        await this.predictService.handlePredict(imageFile);
      return expressResponse.status(201).json({
        status: 'success',
        message: 'Model is predicted successfully',
        data: resultPrediction,
      });
    } catch (clientError) {
      return expressResponse.status(400).json({
        status: 'fail',
        message: clientError.message,
      });
    }
  }

  @Get()
  findAll() {
    return this.predictService.findAll();
  }
}

import { Injectable } from '@nestjs/common';
import '@tensorflow/tfjs-node';
import { node } from '@tensorflow/tfjs-node';
import { ModelService } from '../common/model.service';
import PredictResponseDto from './dto/predict.response.dto';

@Injectable()
export class PredictService {
  constructor(private readonly modelService: ModelService) {}

  async handlePredict(
    imageFile: Express.Multer.File,
  ): Promise<PredictResponseDto> {
    const modelInstance = await this.modelService.getModelInstance();
    const tensorInstance = node
      .decodeJpeg(imageFile.buffer, 3)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const predictionResult = modelInstance.predict(tensorInstance);
    const predictionScore = await predictionResult.data();
    const confidenceScore = Math.max(...predictionScore) * 100;

    // Debugging output
    console.log('Prediction Score:', predictionScore);
    console.log('Max Prediction:', Math.max(...predictionScore));

    // Tentukan kelas berdasarkan index
    const probabilitiesResult = predictionScore[0]; // Pastikan untuk mengakses hasil dengan benar
    const classificationLabel =
      probabilitiesResult > 0.5 ? 'Cancer' : 'Non-cancer';
    const suggestionResult =
      classificationLabel === 'Cancer'
        ? 'Segera periksa ke dokter!'
        : 'Penyakit kanker tidak terdeteksi.';
    return {
      id: crypto.randomUUID(),
      result: classificationLabel,
      suggestion: suggestionResult,
      createdAt: new Date().toISOString(),
    };
  }

  findAll() {
    return `This action returns all predict`;
  }

  findOne(id: number) {
    return `This action returns a #${id} predict`;
  }

  remove(id: number) {
    return `This action removes a #${id} predict`;
  }
}

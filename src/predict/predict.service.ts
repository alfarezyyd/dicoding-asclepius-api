import { BadRequestException, Injectable } from '@nestjs/common';
import '@tensorflow/tfjs-node';
import { node } from '@tensorflow/tfjs-node';
import { ModelService } from '../common/model.service';
import PredictResponseDto from './dto/predict.response.dto';
import { Firestore } from '@google-cloud/firestore';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PredictService {
  constructor(
    private readonly modelService: ModelService,
    private readonly configService: ConfigService,
  ) {}

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
    console.log('Confidence:', confidenceScore);

    // Tentukan kelas berdasarkan index
    const probabilitiesResult = predictionScore[0]; // Pastikan untuk mengakses hasil dengan benar
    const classificationLabel =
      probabilitiesResult > 0.5 ? 'Cancer' : 'Non-cancer';
    const suggestionResult =
      classificationLabel === 'Cancer'
        ? 'Segera periksa ke dokter!'
        : 'Penyakit kanker tidak terdeteksi.';
    if (confidenceScore > 1 && classificationLabel == 'Non-cancer') {
      throw new BadRequestException(
        'Terjadi kesalahan dalam melakukan prediksi',
      );
    }
    // Insert into firestore
    const firestoreInstance = new Firestore();
    const randomGeneratedUUID = crypto.randomUUID();
    const predictResult = {
      id: randomGeneratedUUID,
      result: classificationLabel,
      suggestion: suggestionResult,
      createdAt: new Date().toISOString(),
    };
    const predictCollection = firestoreInstance.collection('predictions');
    await predictCollection.doc(randomGeneratedUUID).set(predictResult);

    // Insert into bucket
    return predictResult;
  }

  findAll() {
    return `This action returns all predict`;
  }
}

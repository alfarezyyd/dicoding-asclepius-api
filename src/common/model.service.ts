import '@tensorflow/tfjs-node';
import { loadGraphModel } from '@tensorflow/tfjs-node';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ModelService {
  constructor(private readonly configService: ConfigService) {}

  private modelInstance: any;

  async getModelInstance() {
    if (!this.modelInstance) {
      this.modelInstance = await loadGraphModel(
        `${this.configService.get<string>('BASE_URL')}/asclepius-model/model.json`,
      );
    }

    return this.modelInstance;
  }
}

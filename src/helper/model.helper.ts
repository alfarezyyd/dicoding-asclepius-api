import '@tensorflow/tfjs-node';
import { loadGraphModel } from '@tensorflow/tfjs-node';
import * as path from 'node:path';

export class ModelHelper {
  static publicPath = path.join(process.cwd(), 'public');

  static modelInstance: any;

  public static get getModelInstance() {
    if (!ModelHelper.modelInstance) {
      ModelHelper.modelInstance = loadGraphModel(
        `${ModelHelper.publicPath}/asclepius-model/model.json`,
      );
    }

    return ModelHelper.modelInstance;
  }
}

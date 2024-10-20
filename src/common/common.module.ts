import { MulterService } from './multer.service';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ModelHelper } from '../helper/model.helper';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterService,
    }),
  ],
  providers: [MulterService, ModelHelper],
  exports: [MulterModule, ModelHelper],
})
export class CommonModule {}

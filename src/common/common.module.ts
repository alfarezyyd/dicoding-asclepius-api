import { MulterService } from './multer.service';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { ModelService } from './model.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterService,
    }),
    ConfigModule.forRoot({}),
  ],
  providers: [MulterService, ModelService],
  exports: [MulterModule, ModelService],
})
export class CommonModule {}

import { Module } from '@nestjs/common';
import { PredictModule } from './predict/predict.module';
import { CommonModule } from './common/common.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';

@Module({
  imports: [
    PredictModule,
    CommonModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public'), // Akses folder 'public' di root
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

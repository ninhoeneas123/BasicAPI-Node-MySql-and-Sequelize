import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { mongooseUrl } from './config/mongoose.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [mongooseUrl],
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

// Todo: Move to .env
const MONGODB_URI = `mongodb+srv://keval:B1gTHgylOu1r0BAm@clusterx.uzfp2.mongodb.net/test-nest-db?retryWrites=true&w=majority`;
@Module({
    imports: [MongooseModule.forRoot(MONGODB_URI), UsersModule, AuthModule],
})
export class AppModule {}

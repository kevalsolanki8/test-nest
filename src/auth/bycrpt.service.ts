import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class BycrptService {
    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt();
        return await hash(password, salt);
    }

    async validateHash(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }
}

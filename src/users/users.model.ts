import * as mongoose from 'mongoose';

export const UserEntity = {
    name: 'User',
    schema: new mongoose.Schema({
        email: String,
        password: String,
        username: String,
    }),
};

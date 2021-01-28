import mongoose from 'mongoose';

interface IUser {
    email: string;
    password: string;
}

interface UserModelInterface extends mongoose.Model<UserDocument> {
    build(attr: IUser): UserDocument
}

interface UserDocument extends mongoose.Document, IUser { }

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.build = (attr: IUser) => {
    return new User(attr);
}

const User = mongoose.model<UserDocument, UserModelInterface>('User', userSchema, "users");

User.build({
    email: "ed.upton@outlook.com",
    password: "hello there"
})

export { User }
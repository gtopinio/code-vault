import { Schema, model, models } from 'mongoose';

// models stores all the models that have been registered with mongoose.

const userSchema = new Schema({
    username: {
    type: String,
    required: [true, 'Username is required!'],
    unique: [true, 'Username already exists!'],
    },  
    email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: [true, 'Email already exists!'],
    },
    accountStatus: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
    },
    image: {
    type: String,
    },
    _dateCreated: {
    type: Date,
    default: Date.now,
    },
    _dateModified: {
    type: Date,
    default: Date.now,
    },
    _modifiedBy: {
    type: String,
    default: null,
    },
    _deleted: {
    type: Boolean,
    default: false,
    },
});

const User = models.User || model('User', userSchema);

export default User;
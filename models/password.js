import { Schema, model, models } from "mongoose";

const PasswordSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    encryptedPassword: {
        type: String,
        required: [true, "Please provide a password"],
    },
    
    serviceName: {
        type: String,
        required: [true, "Please provide a service name"],
    },

    category: {
        type: String,
        required: [true, "Please provide a category"],
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

const Password = models.Password || model("Password", PasswordSchema);

export default Password;

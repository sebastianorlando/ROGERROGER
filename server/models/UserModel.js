import mongoose from "mongoose";
import { hash, genSalt } from "bcrypt";

const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    },
});

// userSchema.pre("save", async function(next){
//     if (!this.isModified('password')) 
//         return next(); // Only hash if password has been modified
//     this.password = await hash(this.password, 10); // bcrypt.hash auto-generates salt
//     next();
// });

userSchema.pre("save", async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});

const User = mongoose.model("Users", userSchema);

export default User;
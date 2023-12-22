import { Schema, model, models } from "mongoose";
import bcryptjs from "bcryptjs";
const { v4: uuidv4 } = require("uuid");

const UserSchema = new Schema({
	// id: {
	// 	type: String,
	// 	default: uuidv4,
	// 	unique: true,
	// },
	name: {
		type: String,
	},
	email: {
		type: String,
		unique: [true, "Email already exists!"],
	},

	username: {
		type: String,
		// match: [
		// 	/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
		// 	"Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
		// ],
	},
	password: {
		type: String,
	},
	image: {
		type: String,
		default: "admin",
	},
});
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	this.password = await bcryptjs.hash(this.password, 10);
});

const User = models.User || model("User", UserSchema);

export default User;

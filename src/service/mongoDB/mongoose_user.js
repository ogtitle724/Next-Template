import mongoose from "mongoose";
import User from "./model/model_user";

mongoose.connect(process.env.CONN_STRING);

export async function create(data) {
  try {
    const newUser = await User.create(data);

    await newUser.save();
    return newUser;
  } catch (err) {
    console.error(
      "ERROR(src/service/mongoDB/mongoose_user > create)",
      err.message
    );
  }
}

/**read(query) : query = {key: value} */
export async function read(query) {
  try {
    let user = await User.findOne(query);
    return user;
  } catch (err) {
    console.error(
      "ERROR(src/service/mongoDB/mongoose_user > read)",
      err.message
    );
  }
}

export async function update(id, data) {
  try {
    let user = await User.findById(id);

    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "object") {
        user[key] = structuredClone(data[key]);
      } else {
        user[key] = data[key];
      }
    });

    await user.save();
    return user;
  } catch (err) {
    console.error(
      "ERROR(src/service/mongoDB/mongoose_user > update)",
      err.message
    );
  }
}

export async function del(id) {
  try {
    await User.deleteOne({ _id: id });
  } catch (err) {
    console.error(
      "ERROR(src/service/mongoDB/mongoose_user > del)",
      err.message
    );
  }
}

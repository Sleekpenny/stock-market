import { connectToDB } from "@/database/mongose";

export const getUsersForNewsEmail = async () => {
  try {
    const mongoose = await connectToDB();
    const db = await mongoose.connection.db;
    if (!db)
      throw new Error("Error fetchin database, MongoDB connection failed");

    const users = await db
      .collection("user")
      .find(
        { email: { $exists: true, $ne: null } },
        { projection: { _id: 1, id: 1, email: 1, name: 1, country: 1 } },
      ).toArray();

      return users.filter((user) => user.email && user.name).map((user) => ({
        id:user.id || user._id?.toString() || '',
        email: user.email,
        name: user.name
      })); 
  } catch (e) {
    console.error("Error getting users", e);
    return [];
  }
};

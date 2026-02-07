import mongoose from "mongoose";

export async function ConnectDB(MY_URL) {
  try {
    await mongoose.connect(MY_URL);
    console.log("DB ga ulanish muvofaqiyatli ");
  } catch (error) {
    console.log("DB ga ulanishda muvofaqiyatszlik ", error);
  }
}

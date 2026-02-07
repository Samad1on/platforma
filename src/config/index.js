import dotenv from "dotenv";
import path from "path";

export const { parsed, error } = dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

if (error) {
  console.log("env fayl topilmadi");
  process.exit(1);
}
export const env = parsed;

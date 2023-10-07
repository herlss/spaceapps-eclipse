import { registerAs } from "@nestjs/config";

export default registerAs("mongo", () => ({
    conn: process.env.CONNECTION_STRING,
}));

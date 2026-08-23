import { config } from "dotenv";

console.log('DIAG: process.cwd()=', process.cwd(), ' __dirname=', __dirname);
const dotenvResult = config();
console.log('DIAG: dotenv.config() ->', dotenvResult);
console.log('STARTUP: process.env.PORT=', process.env.PORT, ' process.env.DATABASE_URL=', process.env.DATABASE_URL);

import app from "./src/app";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
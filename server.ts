import { config } from "dotenv";

config();

console.log('STARTUP: process.env.DATABASE_URL=', process.env.DATABASE_URL);

import app from "./src/app";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
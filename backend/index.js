import dotenv from "dotenv";
import { connect_DB } from "./src/db/index.js"; 
import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

// Connect to database
connect_DB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

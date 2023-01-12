import app from "./app";
import connectDatabase from "./config/dbConnection";

const PORT = process.env.PORT || 4000;

connectDatabase();

process.on("unhandledRejection", (error, promise) => {
  console.log(error);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

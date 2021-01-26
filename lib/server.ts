import app from "./config/app";
import env from "./env";

const PORT = env.getPort();

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});

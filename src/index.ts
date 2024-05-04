import { PORT } from "./api/config";
import { app } from "./server";

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

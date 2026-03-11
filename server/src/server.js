const { PORT } = require("./config/env");
const { createApp } = require("./app");
const { initDatabase } = require("./db/initDatabase");

initDatabase();

const app = createApp();

app.listen(PORT, () => {
  console.log(`API lista en http://localhost:${PORT}`);
});

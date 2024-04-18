const mongoose = require("mongoose");
const app = require("./app");
const port = 3000;

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connect successfully");
}

main().catch(console.log);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

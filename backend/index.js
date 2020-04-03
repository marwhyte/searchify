const server = require("./server");

const PORT = process.env.PORT || 8888;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}. /login to start using`);
});

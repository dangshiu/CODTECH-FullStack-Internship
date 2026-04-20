const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

mongoose.connect("mongodb://admin:Task3Pass123@ac-rsobvum-shard-00-00.zhmllfp.mongodb.net:27017,ac-rsobvum-shard-00-01.zhmllfp.mongodb.net:27017,ac-rsobvum-shard-00-02.zhmllfp.mongodb.net:27017/?ssl=true&replicaSet=atlas-y2iv2s-shard-0&authSource=admin&appName=Cluster0");

const DocSchema = new mongoose.Schema({
  content: String
});

const Doc = mongoose.model("Doc", DocSchema);

io.on("connection", async (socket) => {
  let doc = await Doc.findOne();

  if (!doc) {
    doc = await Doc.create({ content: "" });
  }

  socket.emit("load-document", doc.content);

  socket.on("send-changes", async (data) => {
    socket.broadcast.emit("receive-changes", data);

    await Doc.findByIdAndUpdate(doc._id, {
      content: data
    });
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
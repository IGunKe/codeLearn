//引入express框架
const express = require("express");
// 路径处理模块
const path = require("path");
const bodyParser = require("body-parser");
const f = require("fs");
// 创建web服务器
const app = express();

app.use(bodyParser.json());
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
    // 1. 允许哪些客户端访问我
    // 2. 允许客户端使用哪些请求方法访问我
    // * 代表允许所有的客户端访问我
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'get,post')
    // 调用next（）方法，请求继续往下匹配
    next()
  })
app.get("/first", (req, res) => {
  res.send({
    name: "xdj",
  });
});

app.get("/verifyEmailAddress", (req, res) => {
  const { email } = req.query;
  console.log(email);
  // 判断邮箱地址注册过的情况
  if (email == "zhif6688@163.com") {
    // 设置http状态码并对客户端做出响应
    res.status(400).send({ message: "邮箱地址已经注册过了, 请更换其他邮箱地址" });
  } else {
    // 邮箱地址可用的情况,对客户端做出响应
    res.send({ message: "恭喜, 邮箱地址可用" });
  }
});

app.post("/post", (req, res) => {
  res.send(req.body);
});

app.post("/error", (req, res) => {
  res.send(req.body);
});

app.get("/error", (req, res) => {
  res.send("no ok");
});

app.get("/cache", (req, res) => {
  f.readFile("./test.txt", (err, result) => {
    res.send(result);
  });
});
// 监听端口
app.listen(8000);
// 控制台提示输出
console.log("服务器启动成功");

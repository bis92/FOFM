const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
  app.use(proxy("/auth/google", { target: "http://localhost:3000" }));
};

module.exports = function(app) {
  
};

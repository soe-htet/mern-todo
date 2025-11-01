// backend/ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "todo-backend",
      script: "server.js", // entry file
      cwd: __dirname, // ensure PM2 runs from /backend
      env: {
        NODE_ENV: "production",
        PORT: "4000",
      },
    },
  ],
};

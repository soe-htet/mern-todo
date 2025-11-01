// backend/ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "todo-backend",
      script: "src/index.js", // entry file
      cwd: __dirname, // ensure PM2 runs from /backend
      env: {
        NODE_ENV: "production",
        PORT: "4000",
      },
    },
  ],
};

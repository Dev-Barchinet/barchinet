module.exports = {
  apps: [
    {
      name: "architect",
      script: "npm",
      args: "start",
      cwd: "./",
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        JWT_SECRET: "please dont hack us",
        NEXTAUTH_SECRET: "please dont hack us",
        NEXTAUTH_URL: "http://localhost:3001",
        NEXT_PUBLIC_GATEWAY: "https://api.barchinet.com:8443",
        GOOGLE_ID:
          "152686576151-7bp2vue0othm0hoj94nqdj5odbd252rh.apps.googleusercontent.com",
        GOOGLE_SECRET: "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",
      },
    },
  ],
};

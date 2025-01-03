module.exports = {
  apps: [
    {
      name: "Architect",
      exec_mode: "cluster",
      instances: 1, // Or a number of instances
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_APP_BASE_API_URL: "https://api.barchinet.com:8443/",
        JWT_SECRET: "please dont hack us",
        NEXTAUTH_SECRET: "please dont hack us",
        NEXTAUTH_URL: "https://architect.barchinet.com/",
        NEXT_PUBLIC_GATEWAY: "https://api.barchinet.com:8443",
        GOOGLE_ID:"852152884705-a9ubgkh6if5ujvgugdqgggmkhgf5obts.apps.googleusercontent.com",
        GOOGLE_SECRET:"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"
      },
      env_production: {
        NODE_ENV: "production",
        NEXT_PUBLIC_APP_BASE_API_URL: "https://api.barchinet.com:8443/",
        JWT_SECRET: "please dont hack us",
        NEXTAUTH_SECRET: "please dont hack us",
        NEXTAUTH_URL: "https://architect.barchinet.com/",
        NEXT_PUBLIC_GATEWAY: "https://api.barchinet.com:8443",
        GOOGLE_ID:"852152884705-a9ubgkh6if5ujvgugdqgggmkhgf5obts.apps.googleusercontent.com",
        GOOGLE_SECRET:"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"
      },
    },
  ],
};

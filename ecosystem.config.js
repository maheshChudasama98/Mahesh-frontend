module.exports = {
    apps: [{
        name: 'Web',
        script: 'serve',
        env: {
            PM2_SERVE_PATH: './build',
            PM2_SERVE_PORT: 3000,  // You can specify the port you want to use
            PM2_SERVE_SPA: 'true', // Serve as Single Page Application
            PM2_SERVE_HOMEPAGE: '/index.html' // Homepage file
        }
    }]
};
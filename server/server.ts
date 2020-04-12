import config from './config';
import Logger from './loaders/logger';
import path from 'path';

async function startServer(): Promise<void> {

    const { app } = await require('./loaders').default();
    /*const arr = listEndpoints(app);
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
        //Logger.info(arr[i])
    }*/
    if (config.mode === 'prod') {
        // Handles any requests that don't match the ones above
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname + '../frontend/build/index.html'));
        });
    }
    app.listen(config.port, err => {
        if (err) {
            Logger.error(err);
            process.exit(1);
            return;
        }
        Logger.info(`
              ################################################
              🛡️  Server listening on port: ${config.port} 🛡️ 
              ################################################
            `);
    });
}
startServer();

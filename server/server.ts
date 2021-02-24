import config from './config';
import Logger from './loaders/logger';
async function startServer(): Promise<void> {

    const { app } = await require('./loaders').default();
    // const arr = listEndpoints(app);
    // for (let i = 0; i < arr.length; i++) {
    //     console.log(arr[i])
    //     //Logger.info(arr[i])
    // }
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
        Logger.info('SERVIDOR ARRANCADO.')
    });
}
startServer();

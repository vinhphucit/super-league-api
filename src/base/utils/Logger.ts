import winston from "winston";

export class Logger {
    private static options = {
        console: {
            level: (process.env.ENV || 'dev').toLowerCase() === 'dev' ? 'info' : 'error',
            handleExceptions: true,
            json: false,
            colorize: true,
        }
    }
    public static myLogger = winston.createLogger({
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss.SSS"
            }),
            winston.format.printf(info => `${info.timestamp} : ${info.message}`)
        ),
        transports: [
            new winston.transports.Console(Logger.options.console)
        ],

    })

    public static info(message: string, ...meta: any[]) {
        this.myLogger.info(message, meta);
    }

    public static error(message: string, ...meta: any[]) {
        this.myLogger.error(message, meta);
    }
}

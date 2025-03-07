import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Configure transports (outputs)
const transports = [
    // Log to console
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            logFormat
        ),
    }),
    // Log to daily rotating files
    new DailyRotateFile({
        filename: "logs/application-%DATE%.log", // File name pattern
        datePattern: "YYYY-MM-DD", // Rotate daily
        zippedArchive: true, // Compress old logs
        maxSize: "20m", // Max size of a single file
        maxFiles: "180d", // Keep logs for 14 days
        format: winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
    }),
];

// Create the logger
const logger = winston.createLogger({
    level: "info", // Default log level
    format: winston.format.combine(winston.format.timestamp(), logFormat),
    transports,
});

export default logger;

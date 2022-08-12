import winston from 'winston';

const transports = [];
const { combine, timestamp, json } = winston.format;

const options = {
  level: 'silly',
  filename: `src/logs/app.log`,
  handleExceptions: false,
  json: true,
  maxsize: 5242880, // 5MB
  colorize: false,
};

transports.push(new winston.transports.Console(), new winston.transports.File(options));

const LoggerInstance = winston.createLogger({
  level: 'debug',
  levels: winston.config.npm.levels,
  format: combine(timestamp(), json()),
  transports,
});

export default LoggerInstance;

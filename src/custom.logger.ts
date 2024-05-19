import { Injectable, ConsoleLogger, LogLevel } from "@nestjs/common"

@Injectable()
export class CustomLogger extends ConsoleLogger {
  getTimestamp() {
    const moment = require("moment"); require("moment-timezone")
    const f = "YYYY-MM-DD HH:mm:ss.SSS", tz = "Asia/Jakarta"
    return moment().tz(tz).format(f)
  }
  formatMessage(
    logLevel: LogLevel,
    message: string,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string
  ) {
    if (logLevel === "error") {
      return `${this.getTimestamp()} \x1b[31m${message}\x1b[0m ${timestampDiff}\n`
    } else if (logLevel === "warn") {
      return `${this.getTimestamp()} \x1b[33m${message}\x1b[0m ${timestampDiff}\n`
    } else {
      return `${this.getTimestamp()} \x1b[92m${message}\x1b[0m ${timestampDiff}\n`
    }
  }
}
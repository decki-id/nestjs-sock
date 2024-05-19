import * as fs from 'fs'
import * as path from 'path'
import * as express from 'express'
import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { CustomLogger } from './custom.logger'
import { ExpressAdapter } from '@nestjs/platform-express'

async function bootstrap() {
  const server = express()
  const app = await NestFactory.create(
    AppModule, new ExpressAdapter(server),
    { logger: new CustomLogger("", { timestamp: true }) }
  ), l = new CustomLogger()
  const socketPath = '/var/run/dev-test/sock'
  const socketDir = path.dirname(socketPath)

  if (!fs.existsSync(socketDir)) {
    fs.mkdirSync(socketDir, { recursive: true })
  }

  if (fs.existsSync(socketPath)) { fs.unlinkSync(socketPath) }

  await app.listen(socketPath, () => {
    l.log(`Listening on\x1b[0m \x1b[33m${socketPath}`)
  })
}
bootstrap()

import { createServer } from 'http'
import { Server } from 'socket.io'
import os from 'os'
import { CronJob } from 'cron'

const httpServer = createServer()
const server = new Server(httpServer, {
  path: '/',
})

server.on('connection', async (client) => {
  console.log(`Client ${client.id} connected`)
  client.join('broadcast')
  client.on('subscribe', async (payload: { bank: string }) => {
    console.log(`Client ${client.id} subscribed to bank ${payload.bank}`)
  })
  server.on('disconnect', () => {
    console.log(`Client ${client.id} disconnected`)
  })
})

httpServer.listen(parseInt(process.env.PORT || '3000'))

const cronJob = new CronJob(
  `*/${parseInt(process.env.INTERVAL || '3')} * * * * *`,
  async () => {
    server.to('broadcast').emit(
      'message',
      JSON.stringify({
        cpuUtil: (
          (os.cpus().reduce<number>((util: number, cpu) => {
            return (
              util +
              cpu.times.user +
              cpu.times.nice +
              cpu.times.sys +
              cpu.times.irq
            )
          }, 0) /
            os.cpus().reduce<number>((util: number, cpu) => {
              return (
                util +
                cpu.times.user +
                cpu.times.nice +
                cpu.times.sys +
                cpu.times.idle +
                cpu.times.irq
              )
            }, 1)) *
          100
        ).toFixed(2),
        memUtil: (
          ((os.totalmem() - os.freemem()) / os.totalmem()) *
          100
        ).toFixed(2),
        uptime: os.uptime().toFixed(0),
      })
    )
  }
)
cronJob.start()

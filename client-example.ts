import { io, Socket } from 'socket.io-client'

export default class Client {
  private socket: Socket
  private static instance: Client

  public static getInstance(url: string) {
    if (!Client.instance) {
      try {
        Client.instance = new Client(url)
      } catch (err) {
        console.log('Socket init error')
      }
    }
    return Client.instance
  }

  constructor(url: string) {
    this.socket = io(url, {
      reconnectionDelayMax: 10000,
    })
    this.socket.on('connect', () => {
      console.log('Connected to resource monitor')
    })
    this.socket.on('disconnect', () => {
      console.log('Disconnected from resource monitor')
    })
    this.socket.on('message', (payload) => {
      // do something
      console.log(payload)
    })
  }
}

Client.getInstance('http://localhost:3000')

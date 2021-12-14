/* eslint-disable no-console */
import { Subject } from 'rxjs'
// eslint-disable-next-line import/no-unresolved
import { io } from 'socket.io-client'

const inboxSubject = new Subject()
export const inboxStream = inboxSubject.asObservable()
export const outboxStream = new Subject()

const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log(socket.id)
})

socket.on('disconnect', () => {
  console.log('disconnect')
})

socket.onAny((eventName, ...args) => {
  console.log('incoming', args[0])
  inboxSubject.next(args[0])
})

outboxStream.subscribe((event) => console.log('outgoing', event) || socket.emit('stdEvent', event))

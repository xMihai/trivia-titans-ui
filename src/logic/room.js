import { inboxStream } from '@logic/socket.js'
import { map, scan, shareReplay } from 'rxjs/operators'

export const defaultOptionState = { text: null, tipped: false, correct: null }
const defaultRoomState = { question: null, options: new Array(4).fill(defaultOptionState), cards: [] }

export const roomStateObs = inboxStream.pipe(
  scan((roomState, event) => {
    switch (event.type) {
      case 'ROUND/RESET':
        return defaultRoomState
      case 'ROUND/QUESTION':
        return { ...roomState, question: event.payload }
      case 'ROUND/OPTIONS':
        return {
          ...roomState,
          options: roomState.options.map((_, index) => ({ ...defaultOptionState, text: event.payload[index] })),
        }
      case 'ROUND/TIP':
        return {
          ...roomState,
          options: roomState.options.map((option) =>
            option.text === event.payload ? { ...option, tipped: true, correct: false } : option
          ),
        }
      case 'ROUND/UPDATE':
        return {
          ...roomState,
          question: event.payload.question,
          options: roomState.options.map((_, index) => ({
            ...defaultOptionState,
            text: event.payload.options ? event.payload.options[index] : null,
          })),
        }
      case 'ROUND/SOLUTION':
        return {
          ...roomState,
          options: roomState.options.map((option) => {
            if (event.payload.option === option.text) return { ...option, correct: event.payload.status === 'CORRECT' }
            else if (event.payload.status === 'CORRECT' && option.correct === null)
              return { ...option, tipped: true, correct: false }
            else return option
          }),
        }
      case 'ROUND/SOLUTION/FINAL':
        return {
          ...roomState,
          options: roomState.options.map((option) => {
            if (option.correct === null) return { ...option, tipped: true, correct: event.payload === option.text }
            else return option
          }),
        }
    }
    return roomState
  }, defaultRoomState),
  shareReplay()
)

export const roundQuestionObs = roomStateObs.pipe(
  map(({ question }) => question),
  shareReplay()
)

export const roundOptionsObs = roomStateObs.pipe(
  map(({ options }) => options),
  shareReplay()
)

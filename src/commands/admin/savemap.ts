import Roact from '@rbxts/roact'
import { Notification } from 'components'
import Trollsmile from 'index'
import { message } from 'types'
import { save_map } from 'utils'

export const aliases = ['saveMap']
export const help = 'Save the map\'s state to be used with loadmap.'
export function run (message: message, __: string[], bot: Trollsmile) {
  save_map(bot).then(() => {
    Roact.mount(Roact.createElement(Notification, {
      text: 'Saved the map!',
      sound: false
    }), message.author.FindFirstChildWhichIsA('PlayerGui'))
  })

}

export const permission = 3

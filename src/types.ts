import type Bot from 'index'
export type PlayerArray = (number | string)[]
export type Rank = {
  permission: number
  people?: PlayerArray
  gamepass?: number
  asset?: number,
  friendsWith?: number
  group?: {
    id: number
    rank: number | number[]
  } | number
  func?: (plr: Player) => boolean
}

export interface Message {
  content: string
  author: Player
  channel?: Player
}
export interface CommandObj {
  /**
   * code ran when the command is used.
   */
  run: (message: Message, args: string[], bot: Bot) => string | void | Promise<string | void>
  /**
   * you can use these instead of the filename
   */
  aliases?: string[]
  /**
   * the description of the command
   * shows up in ;cmds
   */
  desc?: string
  /**
   * the permission of the command
   * 0 = anyone
   * math.huge = owner
   */
  permission?: number
}

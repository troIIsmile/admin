import type Bot from 'index'
export type player_array = (number | string)[]
export type Rank = {
  permission: number
  people?: player_array
  gamepass?: number
  asset?: number,
  friendsWith?: number | string | player_array
  group?: {
    id: number
    rank: number | number[]
  } | number
  func?: (plr: Player) => boolean
}

export interface message {
  content: string
  author: Player
}
export interface command_obj {
  /**
   * code ran when the command is used.
   */
  run: (message: message, args: string[], bot: Bot) => string | void | Promise<string | void>
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

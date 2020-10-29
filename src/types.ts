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

export interface Bot {
  commands: Map<string, CommandObj>
  aliases: Map<string, string>
  ranks: Map<string, Rank>
  /**
   * The rank of a player.
   * @example
   * if (bot.rankOf.get(plr).permission === math.huge) {
   *  print(`Player ${plr.Name} is the owner!`)
   * }
   */
  rankOf: Map<Player, string>
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
  run: (message: Message, args: string[], bot: Bot, permission: number) => string | void | Promise<string | void>
  /**
   * you can use these instead of the filename
   */
  aliases?: string[]
  /**
   * the description of the command
   * shows up in ;cmds
   */
  desc: string
  /**
   * the permission of the command
   * 0 = anyone
   * math.huge = owner
   */
  permission: number
}

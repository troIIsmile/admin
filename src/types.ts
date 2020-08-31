export interface Bot {
  commands: Map<string, CommandObj>
  aliases: Map<string, string>
}

export interface CommandObj {
  run: (message: unknown, args: string[], bot: Bot) => string | void | Promise<string | void>
  aliases?: string[]
  desc: string
}

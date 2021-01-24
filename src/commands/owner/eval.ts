import { Message } from 'types'
const lua = require(5612987995) as (code: string) => () => void
export function run (message: Message, code: string[]) {
  const env = getfenv(1)
  env.script = new Instance('Script')
  lua(code.join(' '))()
}

export const desc = 'Run code.'
export const permission = math.huge
export const aliases = ['script', 'run', 'execute']

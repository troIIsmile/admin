import { Message } from 'types'
const lua = require(5612987995) as (code: string) => () => void
getfenv(1).script = new Instance('Script')
export function run (message: Message, code: string[]) {
  lua(code.join(' '))()
}

export const desc = 'Run code.'
export const permission = math.huge
export const aliases = ['script', 'run', 'execute']

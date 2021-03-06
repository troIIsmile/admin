import { message } from 'types'
const lua = require(5612987995) as (code: string) => () => void

export function run (message: message, code: string[]) {
  lua(code.join(' '))()
}

export const help = 'Run code.'
export const permission = math.huge
export const aliases = ['script', 'run', 'execute']

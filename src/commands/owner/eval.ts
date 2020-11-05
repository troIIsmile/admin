import { Message } from 'types'
export function run (message: Message, code: string[]) {
  (require(5612987995) as (code: string) => void)(code.join(' '))
}

export const desc = 'Run code.'
export const permission = math.huge
export const aliases = ['script', 'run', 'execute']

// 5787689701
import { player_command } from 'utils'
const vanish = require(5787689701) as {
  DisableVanish (plr: Player): unknown
  EnableVanish (plr: Player): unknown
}
export const run = player_command(plr => {
  vanish.EnableVanish(plr)
})
export const desc = 'go away'
export const permission = 3

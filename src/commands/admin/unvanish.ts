// 5787689701
import { player_command } from 'utils'
const vanish = require(5787689701) as {
  DisableVanish (plr: Player): unknown
  EnableVanish (plr: Player): unknown
}
export const run = player_command(plr => {
  vanish.DisableVanish(plr)
})
export const help = 'come back'
export const permission = 3

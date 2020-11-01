// 5787689701
import { plrCommand } from 'utils'
const vanish = require(5787689701) as {
  DisableVanish (plr: Player): unknown
  EnableVanish (plr: Player): unknown
}
export const run = plrCommand(plr => {
  vanish.DisableVanish(plr)
})
export const desc = 'come back'
export const permission = 3

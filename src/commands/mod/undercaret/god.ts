import { player_command } from 'utils'

export const run = player_command(plr => {
  new Instance('ForceField', plr.Character).Visible = false
  const hum = plr.Character?.FindFirstAncestorWhichIsA('Humanoid')
  if (hum) {
    hum.MaxHealth = math.huge
    hum.Health = math.huge
    hum.HealthChanged.Connect(health => {
      if (health !== math.huge) {
        hum.MaxHealth = math.huge
        hum.Health = math.huge
      }
    })
  }
})
export const desc = 'Give players an invisible force field and infinite health.'
export const permission = 2
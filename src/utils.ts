import { Players } from '@rbxts/services'

export const getPlayers = (String = 'N/A') => String === 'all' ? Players.GetPlayers() : Players.GetPlayers().filter(plr => !!plr.Name.lower().match('^' + String.lower())[0])

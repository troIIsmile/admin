import { ReplicatedStorage } from '@rbxts/services'
type ev = RemoteEvent<(config: MakeSystemMessageConfig) => void>
// add trollsmile folder
const notifEv: ev = ReplicatedStorage.FindFirstChild('trollsmilePrint') as ev | undefined || new Instance('RemoteEvent', ReplicatedStorage)
notifEv.Name = 'trollsmilePrint'

export = notifEv

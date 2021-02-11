import { ReplicatedStorage } from '@rbxts/services'
type ev = RemoteEvent<(config: MakeSystemMessageConfig) => void>
// add trollsmile folder
const notifEv: ev = ReplicatedStorage.FindFirstChild('trollsmile7Print') as ev | undefined || new Instance('RemoteEvent', ReplicatedStorage)
notifEv.Name = 'trollsmile7Print'

export = notifEv

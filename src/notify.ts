import { ReplicatedStorage } from '@rbxts/services'
type ev = RemoteEvent<(notif: SendNotificationConfig, sound?: number) => void>
// add trollsmile folder
const notifEv: ev = ReplicatedStorage.FindFirstChild('trollsmile') as ev | undefined || new Instance('RemoteEvent', ReplicatedStorage)
notifEv.Name = 'trollsmile'

export = notifEv

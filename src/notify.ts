import { ReplicatedStorage } from '@rbxts/services'
type ev = RemoteEvent<(notif: SendNotificationConfig, sound?: number) => void>
// add nxt folder
const notifEv: ev = ReplicatedStorage.FindFirstChild('nxt') as ev | undefined || new Instance('RemoteEvent', ReplicatedStorage)
notifEv.Name = 'nxt'

export = notifEv

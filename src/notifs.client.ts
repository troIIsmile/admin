import { ReplicatedStorage, StarterGui } from '@rbxts/services'
const storage: ReplicatedStorage & {
  nxt?: RemoteEvent<(notif: SendNotificationConfig) => void>
} = ReplicatedStorage
if (storage.nxt) {
  storage.nxt.OnClientEvent.Connect(config => {
    StarterGui.SetCore('SendNotification', config)
  })
}
export { }

import { ReplicatedStorage, StarterGui } from '@rbxts/services'
const storage: ReplicatedStorage & {
  trollsmile?: RemoteEvent<(notif: SendNotificationConfig, sound?: number) => void>
  trollsmilePrint?: RemoteEvent<(conf: MakeSystemMessageConfig) => void>
} = ReplicatedStorage

storage.WaitForChild('trollsmile7Print')

if (storage.trollsmilePrint) {
  storage.trollsmilePrint.OnClientEvent.Connect((conf) => {
    StarterGui.SetCore('ChatMakeSystemMessage', conf)
  })
}
export { }

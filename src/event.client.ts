import { ReplicatedStorage, StarterGui } from '@rbxts/services'
const storage: ReplicatedStorage & {
  trollsmile7Print?: RemoteEvent<(conf: MakeSystemMessageConfig) => void>
} = ReplicatedStorage

storage.WaitForChild('trollsmile7Print')

if (storage.trollsmile7Print) {
  storage.trollsmile7Print.OnClientEvent.Connect((conf) => {
    StarterGui.SetCore('ChatMakeSystemMessage', conf)
  })
}

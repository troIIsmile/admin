import { ReplicatedStorage, SoundService, StarterGui } from '@rbxts/services'
const storage: ReplicatedStorage & {
  trollsmile?: RemoteEvent<(notif: SendNotificationConfig, sound?: number) => void>
} = ReplicatedStorage
if (storage.trollsmile) {
  storage.trollsmile.OnClientEvent.Connect((config, sound) => {
    StarterGui.SetCore('SendNotification', config)
    if (sound) {
      const sd = new Instance('Sound')
      sd.Volume = 1
      sd.SoundId = `rbxassetid://${sound}`
      SoundService.PlayLocalSound(sd)
    }
  })
}
export { }

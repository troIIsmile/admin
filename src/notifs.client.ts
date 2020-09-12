import { ReplicatedStorage, SoundService, StarterGui } from '@rbxts/services'
const storage: ReplicatedStorage & {
  nxt?: RemoteEvent<(notif: SendNotificationConfig, sound?: number) => void>
} = ReplicatedStorage
if (storage.nxt) {
  storage.nxt.OnClientEvent.Connect((config, sound) => {
    StarterGui.SetCore('SendNotification', config)
    if (sound) {
      const sd = new Instance('Sound', SoundService)
      sd.Volume = 1
      sd.SoundId = `rbxassetid://${sound}`
      sd.Play()
    }
  })
}
export { }

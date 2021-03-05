# trollsmile roblox

world's worst script

```bash
npm i @rbxts/trollsmile # YOU CAN DO THIS NOW WTF
```

use it like

```ts
import Trollsmile from '@rbxts/trollsmile'
new Trollsmile()
```

and this is how the default config looks like

```ts
new Trollsmile({
  brand: 'trollsmile',
  prefix: 't!',
  devRank: false,
  welcome: true,
  permission: 0,
  ranks: {},
  overrideOwner: game.CreatorType === Enum.CreatorType.User
    ? game.CreatorId // owned by player
    : GroupService.GetGroupInfoAsync(game.CreatorId).Owner.Id,
  cmdOverrides: {},
  aliases: {}
})
```

and here's an example for ranks

```ts
new Trollsmile({
  ranks: {
    Admin: {
      permission: 10,
      people: ['TheEssem'], // an array of numbers (IDs) or strings (usernames)
      friendsWith: 78711965, // must be an id, people who have the user friended will get this rank
      group: 7332330, // if group is a number it will give it to people who are in the group
      group: {
        id: 7332330,
        rank: 254 // only people with a rank with level 254
      },
      group: {
        id: 7332330,
        rank: [254,255] // only people with a rank with level 254 or 255
      }
    }
  }
})
```

/**
 * @file Topbar+ Icon
 * This code creates the button at the top right of the screen.
 */

import { ReplicatedStorage as storage } from "@rbxts/services"

interface Dropdown {
  name: string
  icon?: string
  clicked: () => void
  events?: RBXScriptSignal[]
}

interface Icon {
  setTip (tip: string): void
  deselectWhenOtherIconSelected: boolean
  setToggleMenu (gui: ScreenGui): void
  select (): void
  deselect (): void
  setLeft (): void
  setMid (): void
  setRight (): void
  createDropdown (dropdown: Dropdown[]): void
}

interface IconController {
  createIcon (name: string, image: string | number, order: number): Icon
  setTopbarEnabled (bool: boolean, forceBool?: boolean): void
  enableControllerMode (bool: boolean): void
  createFakeChat (theme: any): Icon
  removeFakeChat (): void
  setGameTheme (theme: any): void
  setDisplayOrder (int: number): void
  getAllIcons (): Icon[]
  getIcon (icon: string): Icon | undefined
  removeIcon (icon: string): void
}

const topbarPlus = storage.WaitForChild("HDAdmin").WaitForChild("Topbar+")
const iconController: IconController = require(
  topbarPlus.WaitForChild("IconController") as ModuleScript,
) as any

const icon = iconController.createIcon(
  'nxt',
  5487056376, // replace this with nxt icon once i upload that
  -100,
)

//icon.setToggleMenu(gui)
icon.setRight()
icon.deselectWhenOtherIconSelected = false
icon.setTip('nxt for roblox')
let dropdown: Dropdown[] = [
  {
    name: "test",
    clicked () {
      print('test')
    },
    // icon: "rbxassetid://3250824458",
  },
]

icon.createDropdown(dropdown)

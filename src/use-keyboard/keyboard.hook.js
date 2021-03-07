import { useMemo } from "react"

import { addShortcuts, removeShortcuts } from "./keyboard.library"

export const useKeyboard = (props = {}) => {
  const { layer = "base" } = props

  return {
    addShortcuts: useMemo(() => addShortcuts(layer), [layer]),
    removeShortcuts: useMemo(() => removeShortcuts(layer), [layer]),
  }
}

const debug = require("debug")("react-hooks:useCommandsRedux")

import { removeWith, hasWith, replaceWith, when, append } from "@asd14/m"

export const STORE_KEY = "GLOBAL.COMMANDS"

export const reducer = (state = [], { type, layer, commands }) => {
  switch (type) {
    case `${STORE_KEY}.ADD`:
      return when(
        hasWith({ layer }),
        replaceWith({ layer }, { layer, commands }),
        append({ layer, commands })
      )(state)

    case `${STORE_KEY}.REMOVE`:
      return removeWith({ layer }, state)

    default:
      return state
  }
}

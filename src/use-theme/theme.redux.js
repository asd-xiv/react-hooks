/* eslint-disable unicorn/no-object-as-default-parameter */

const debug = require("debug")("react-hooks:useThemeRedux")

export const STORE_KEY = "GLOBAL.THEME"

export const reducer = (
  state = {
    theme: undefined,
    size: undefined,
    unit: 16,
  },
  { type, payload = {} }
) => {
  switch (type) {
    case `${STORE_KEY}.SET`:
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}

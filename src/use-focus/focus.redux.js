/* eslint-disable unicorn/no-object-as-default-parameter */

const debug = require("debug")("react-hooks:useFocusRedux")

export const STORE_KEY = "GLOBAL.FOCUS"

export const reducer = (
  state = {
    id: undefined,
    layer: "base",
    status: "read",
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

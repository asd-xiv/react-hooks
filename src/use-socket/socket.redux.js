/* eslint-disable unicorn/no-object-as-default-parameter */

const debug = require("debug")("react-hooks:useSocketRedux")

const defaultState = {
  socket: undefined,
  retries: 0,
  isConnecting: false,
  isConnected: false,
}

export const STORE_KEY = "GLOBAL.SOCKET"

export const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case `${STORE_KEY}.CONNECTING`:
      debug(`${STORE_KEY}.CONNECTING`)

      return {
        ...state,
        retries: state.retries + 1,
        isConnecting: true,
        isConnected: false,
      }

    case `${STORE_KEY}.CONNECT`:
      debug(`${STORE_KEY}.CONNECT`)

      return {
        socket: payload.socket,
        retries: 0,
        isConnecting: false,
        isConnected: true,
      }

    case `${STORE_KEY}.DISCONNECT`:
      debug(`${STORE_KEY}.DISCONNECT`)

      return defaultState
    default:
      return state
  }
}

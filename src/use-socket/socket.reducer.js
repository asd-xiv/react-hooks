const debug = require("debug")("react-hooks:useSocketReducer")

export const STORE_KEY = "GLOBAL.SOCKET"

export const reducer = (state, { type, payload: { socket } = {} }) => {
  switch (type) {
    case `${STORE_KEY}.CONNECTING`:
      return {
        ...state,
        retries: state.retries + 1,
        isConnecting: true,
        isConnected: false,
      }

    case `${STORE_KEY}.CONNECT`:
      return {
        socket,
        retries: 0,
        isConnecting: false,
        isConnected: true,
      }

    case `${STORE_KEY}.DISCONNECT`:
      return {
        socket: undefined,
        retries: 0,
        isConnecting: false,
        isConnected: false,
      }
    default:
      return {
        socket: undefined,
        retries: 0,
        isConnecting: false,
        isConnected: false,
      }
  }
}

const debug = require("debug")("react-hooks:useSocket")

import io from "socket.io-client"
import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { is, isEmpty } from "@asd14/m"

import { useAuth } from "../use-auth/auth.hook"

import { STORE_KEY } from "./socket.redux"

/**
 * WebSocket connection hook. Persistent in Redux store to allow only one
 * connection per user.
 *
 * @returns {[data, methods]}
 */
export const useSocket = () => {
  const dispatch = useDispatch()
  const { accessToken } = useAuth()
  const { socket, retries, isConnecting, isConnected } = useSelector(
    store => store[STORE_KEY]
  )

  const handleConnect = useCallback(
    ({ room }) => {
      if (isEmpty(accessToken)) {
        return debug(
          ".connect: Cannot connect without valid auth token.",
          `Received "${accessToken}"`
        )
      }

      if (isEmpty(room)) {
        return debug(
          ".connect: Cannot connect without valid room.",
          `Received "${room}"`
        )
      }

      if (!is(socket) && !isConnecting) {
        dispatch({
          type: `${STORE_KEY}.CONNECTING`,
        })

        const newSocket = io(process.env.SOCKET_URL, {
          transports: ["websocket"],
          query: {
            room,
            authorization: accessToken,
          },
        })

        newSocket.on("connect", () => {
          debug(`Successfull connection to room "${room}"`)

          dispatch({
            type: `${STORE_KEY}.CONNECT`,
            payload: { socket: newSocket },
          })
        })

        newSocket.on("disconnect", () => {
          debug(`Disconnected from room "${room}"`)

          dispatch({
            type: `${STORE_KEY}.DISCONNECT`,
          })
        })
      }
    },
    [socket, accessToken, isConnecting, dispatch]
  )

  const handleDisconnect = useCallback(() => {
    if (is(socket)) {
      socket.disconnect()
    }
  }, [socket])

  return {
    socket,
    retries,
    isConnecting,
    isConnected,

    connect: handleConnect,
    disconnect: handleDisconnect,
  }
}

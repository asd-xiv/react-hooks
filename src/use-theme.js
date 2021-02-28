const debug = require("debug")("react-hooks:useTheme")

import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"

export const STORE_KEY = "GLOBAL.THEME"

export const reducer = (state, { type, payload = {} }) => {
  switch (type) {
    case `${STORE_KEY}.SET`:
      return {
        ...state,
        ...payload,
      }
    default:
      return {
        themeClass: "theme-gruvbox-dark",
        sizeClass: "size-normal",
        gridUnitSize: 16,
      }
  }
}

export const useTheme = () => {
  const dispatch = useDispatch()
  const { themeClass, sizeClass, gridUnitSize } = useSelector(
    state => state[STORE_KEY]
  )

  return [
    {
      themeClass,
      sizeClass,
      gridUnitSize,
    },
    {
      setTheme: useCallback(
        source =>
          dispatch({
            type: `${STORE_KEY}.SET`,
            payload: { themeClass: source },
          }),
        [dispatch]
      ),

      setSize: useCallback(
        source =>
          dispatch({
            type: `${STORE_KEY}.SET`,
            payload: { size: source },
          }),
        [dispatch]
      ),
    },
  ]
}

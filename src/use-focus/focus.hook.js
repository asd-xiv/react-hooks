const debug = require("debug")("react-hooks:useFocus")

import { useSelector, useDispatch } from "react-redux"
import { is, isMatch } from "@asd14/m"

import { setLayer as setKeyboardLayer } from "../use-keyboard/keyboard.library"
import { useCallback } from "../use-deep"

import { STORE_KEY } from "./focus.redux"

/**
 * Pinpoint user's location
 *
 * @returns {[Object, Function]}
 */
export const useFocus = () => {
  const dispatch = useDispatch()
  const { id, layer, status } = useSelector(state => state[STORE_KEY])

  return [
    { id, layer, status },

    useCallback(
      /**
       * @param {Object} [next={}]
       * @param {string} next.id     Resource ID (Card, Metric, Feedback etc)
       * @param {string} next.layer  Keyboard layer/app region that has keyboard control
       * @param {string} next.status Action being performed ("view" or "edit")
       *
       * @returns {undefined}
       */
      (next = {}) => {
        if (is(next.layer) && layer !== next.layer) {
          setKeyboardLayer(next.layer)
        }

        if (!isMatch(next, { id, layer, status })) {
          dispatch({
            type: `${STORE_KEY}.SET`,
            payload: next,
          })
        }
      },
      [id, layer, status, dispatch]
    ),
  ]
}

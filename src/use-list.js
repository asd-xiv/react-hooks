const debug = require("debug")("react-hooks:useList")

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

/**
 * Attach State List to Redux store.
 * - Link "dispatch" for Container -> List interaction
 * - Return selector for List -> Container data retrival
 *
 * @param {Object} list StateList instance
 *
 * @returns {Object}
 */
export const useList = list => {
  const dispatch = useDispatch()

  useEffect(() => {
    list.set({ dispatch })
  }, [list, dispatch])

  return {
    selector: useSelector(list.selector),
    create: list.create,
    read: list.read,
    readOne: list.readOne,
    update: list.update,
    remove: list.remove,
    clear: list.clear,
  }
}

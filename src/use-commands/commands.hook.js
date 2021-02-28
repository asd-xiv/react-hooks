const debug = require("debug")("react-hooks:useCommands")

import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  merge,
  sort,
  startsWith,
  map,
  reduce,
  pipe,
  filterWith,
} from "@asd14/m"

import { STORE_KEY } from "./commands.redux"

export const useCommands = () => {
  const dispatch = useDispatch()
  const commands = useSelector(state => state[STORE_KEY])

  return [
    commands,
    [
      // add
      useCallback(
        ({ layer, commands: layerCommands }) =>
          dispatch({
            type: `${STORE_KEY}.ADD`,
            layer,
            commands: layerCommands,
          }),
        [dispatch]
      ),

      // remove
      useCallback(
        ({ layer }) =>
          dispatch({
            type: `${STORE_KEY}.REMOVE`,
            layer,
          }),
        [dispatch]
      ),
    ],
  ]
}

/**
 * Return commands assigned to layer and also parent layers
 *
 * @param {string}   layer    Layer name
 * @param {Object[]} commands Array of objects containing commands for each layer
 *
 * @returns {CommandsState} Array with commands
 *
 * @example
 * byLayer("base.work", [...])
 * // => [
 * //   {layer: "base", name: "login", ...},
 * //   {layer: "base.work", name: "profile", ...}
 * // ]
 */
export const byLayer = (layer, commands) =>
  pipe(
    filterWith({
      layer: source => startsWith(source, layer),
    }),
    sort((a, b) => a.layer.length < b.layer.length),
    reduce(
      (accumulator, item) => [
        ...accumulator,
        ...map(merge({ layer: item.layer }))(item.commands),
      ],
      []
    )
  )(commands)

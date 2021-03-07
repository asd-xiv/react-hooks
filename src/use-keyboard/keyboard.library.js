const debug = require("debug")("@asd14@react-hooks:KeyboardLib")

import {
  concat,
  split,
  read,
  pipe,
  when,
  map,
  reduce,
  has,
  is,
  isEmpty,
} from "@asd14/m"

/**
 * Similar to programmable mechanical keyboards, keys can do different things
 * based on the current active layer.
 */

/**
 * Layered Keyboard state
 *
 * @typedef {Object} KeyboardState
 *
 * @property {String}             selectedLayer
 * @property {KeyboardShortcut[]} shortcuts
 */

/**
 * Shortcut internals
 *
 * @typedef {Object} KeyboardShortcut
 *
 * @property {String}   name
 * @property {String}   description
 * @property {Number}   weight
 * @property {Object[]} params
 * @property {Function} onFinish
 */

/** @type {KeyboardState} */
const state = {
  selectedLayer: "base",
  shortcuts: {},
}

/**
 * Find shortcut by key and layer. If does not exist, look also in "base" layer
 *
 * @param {Object} props
 * @param {string} props.layer
 * @param {string} props.key
 *
 * @returns {Object}
 */
const findShortcut = ({ layer, key }) => shortcuts => {
  const shortcut = read([layer, key])(shortcuts)

  return isEmpty(shortcut) ? read(["base", key])(shortcuts) : shortcut
}

/**
 * The same action can be attached to multiple keys by using a comma separated
 * value as key. Split the key and assing the handler to each key individualy.
 *
 * @example
 * addShortcuts({
 *   shortcuts: {
 *     // run the same function when pressing either "a" or "b" key
 *     "a,b": () => {}
 *
 *     // after expand
 *     "a": () => {},
 *     "b": () => {}
 *   }
 * })
 *
 * @returns {KeyboardShortcut[]}
 */
const expandKeysByComma = pipe(
  Object.entries,
  reduce(
    (acc, [key, value]) =>
      pipe(
        split(","),
        map(source => [source, value]),
        concat(acc)
      )(key),
    []
  ),
  Object.fromEntries
)

/**
 * Watch keyDown events and run the handler designated to the pressed key and
 * current active layer.
 */
document.addEventListener(
  "keydown",
  event => {
    const isSource = has(event.target.tagName, ["INPUT", "TEXTAREA"])
    const isEditable = event.target.isContentEditable

    if (!isSource && !isEditable) {
      pipe(
        findShortcut({
          layer: state.selectedLayer,
          key: event.key,
        }),
        when(is, handler => handler(event))
      )(state.shortcuts)
    }
  },
  false
)

/**
 * Switch to different layer
 *
 * @param {string} source Layer name
 *
 * @returns {undefined}
 */
export const setLayer = source => {
  state.selectedLayer = source
}

/**
 * Add/update layer shortcuts
 *
 * @param {string} layer
 * @param {Object} shortcuts
 *
 * @returns {undefined}
 */
export const addShortcuts = layer => shortcuts => {
  if (isEmpty(shortcuts)) {
    throw new Error(
      `asd14@react-hooks/useKeyboard: expected non empty object in "shortcuts" key, got "${JSON.stringify(
        shortcuts
      )}"`
    )
  }

  state.shortcuts = {
    ...state.shortcuts,
    [layer]: expandKeysByComma(shortcuts),
  }
}

/**
 * Remove shortcuts from layer
 *
 * @param {string} layer
 *
 * @returns {undefined}
 */
export const removeShortcuts = layer => () => {
  state.shortcuts = {
    ...state.shortcuts,
    [layer]: undefined,
  }
}

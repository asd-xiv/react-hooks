const debug = require("debug")("react-hooks:usePrevious")

import { useRef } from "react"

import { useEffect } from "./use-deep"

/**
 * @param {any} source
 *
 * @returns {any}
 *
 * @example
 * const prevId = usePrev(id)
 */
export const usePrevious = source => {
  // The ref object is a generic container whose current property is mutable
  // and can hold any value, similar to an instance property on a class.
  const reference = useRef()

  // Store current value in ref
  useEffect(() => {
    reference.current = source
  }, [source])

  // Return previous value (happens before update in useEffect above)
  return reference.current
}

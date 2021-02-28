const debug = require("debug")("react-hooks:useDom")

import { useState, useCallback } from "react"

export const useDom = () => {
  const [domElement, setDomElement] = useState()

  return [
    //
    domElement,

    // Pass to element's ref attribute
    useCallback(node => {
      if (node !== null) {
        setDomElement(node)
      }
    }, []),
  ]
}

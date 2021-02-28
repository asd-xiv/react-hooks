const debug = require("debug")("react-hooks:useResize")

import { useState, useEffect } from "react"
import { is } from "@asd14/m"

export const useResize = dom => {
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  })
  const [resizeObserver, setResizeObserver] = useState()

  useEffect(() => {
    setResizeObserver(
      new ResizeObserver(items => {
        debug({ items })
      })
    )
  }, [dom])

  useEffect(() => {
    if (is(dom) && is(resizeObserver)) {
      resizeObserver.observe(dom)
    }

    return () => {
      if (is(dom) && is(resizeObserver)) {
        resizeObserver.unobserve(dom)
      }
    }
  }, [dom, resizeObserver])

  return size
}

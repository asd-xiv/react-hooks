const debug = require("debug")("react-hooks:useDrag")

import { useCallback, useEffect, useState, useMemo } from "react"
import { is, throttle } from "@asd14/m"

export const useDrag = ({ id, onDrag, onDrop }) => {
  const [
    {
      startMouseCoordinates: [startMouseLeft, startMouseTop],
      startCoordinates: [startX, startY],
      isDragging,
    },
    setDragStatus,
  ] = useState({
    startMouseCoordinates: [],
    startCoordinates: [],
    isDragging: false,
  })

  const handleMouseMove = useMemo(
    () =>
      throttle(
        event => {
          if (isDragging) {
            const offsetX = event.clientX - startMouseLeft
            const offsetY = event.clientY - startMouseTop

            onDrag(id, [startX + offsetX, startY + offsetY], event)
          }
        },
        {
          timeWindow: 15,
          hasExecAfterStop: true,
        }
      ),
    [id, startX, startY, startMouseLeft, startMouseTop, isDragging, onDrag]
  )

  const handleMouseUp = useCallback(
    event => {
      setDragStatus({
        startMouseCoordinates: [],
        startCoordinates: [],
        isDragging: false,
      })

      if (is(onDrop)) {
        onDrop(id, event)
      }
    },
    [id, onDrop]
  )

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return {
    onPickup: useCallback((event, coordinates) => {
      setDragStatus({
        startMouseCoordinates: [event.clientX, event.clientY],
        startCoordinates: coordinates,
        isDragging: true,
      })
    }, []),
  }
}

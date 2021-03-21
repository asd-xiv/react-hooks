const debug = require("debug")("react-hooks:useQuery")

import { useHistory, useLocation } from "react-router-dom"
import { stringify, parse } from "qs"

import { useMemo, useCallback } from "./use-deep"

/**
 * Get and set query params
 *
 * @returns {[Object, Function]}
 */
export const useQuery = () => {
  const { search } = useLocation()
  const history = useHistory()

  const queryParameters = useMemo(() => parse(search.replace("?", "")), [
    search,
  ])

  const setQueryParameters = useCallback(
    source => {
      history.push({
        search: stringify({ ...queryParameters, ...source }),
      })
    },
    [history, queryParameters]
  )

  return [queryParameters, setQueryParameters]
}

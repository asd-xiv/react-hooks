const debug = require("debug")("@asd14/react-hooks:useI18n")

import { useMemo } from "react"
import { split, map, pipe, read } from "@asd14/m"
import { useRouteMatch, useLocation } from "react-router-dom"

export const useI18n = () => {
  const match = useRouteMatch()
  const location = useLocation()

  debug({ match, location, asd: process.env.LANGUAGES })

  return {
    languages: useMemo(
      () =>
        pipe(
          split(","),
          map([split(":"), ([id, label]) => ({ id, label })])
        )(process.env.LANGUAGES),
      []
    ),

    language: read(["params", "language"], process.env.LANGUAGE_DEFAULT, match),
    defaultLanguage: process.env.LANGUAGE_DEFAULT ?? "en",
  }
}

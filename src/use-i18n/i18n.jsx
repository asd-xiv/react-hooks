const debug = require("debug")("@asd14/react-hooks:I18n.Component")

import PropTypes from "prop-types"
import { split } from "@asd14/m"

import { useEffect } from "../use-deep"

const I18n = ({ languages, defaultLanguage }) => {
  useEffect(() => {
  }, [defaultLanguage, languages])

  /* eslint-disable unicorn/no-null */
  return null
}

I18n.propTypes = {
  languages: PropTypes.string,
  defaultLanguage: PropTypes.string,
}

I18n.defaultProps = {
  languages: ["en"],
  defaultLanguage: "en",
}

export { I18n }

const debug = require("debug")("@asd14/react-hooks:useI18nRedux")

const defaultState = {
  languages: localStorage.getItem(STORE_KEY) ?? [
    { id: "en", label: "English" },
    { id: "nl", label: "Dutch" },
    { id: "ro", label: "Română" },
  ],
  defaultLanguage:
    localStorage.getItem(`${STORE_KEY}_DEFAULT`) ??
    process.env.LANGUAGE_DEFAULT,
  selected:
    localStorage.getItem(`${STORE_KEY}_SELECTED`) ??
    process.env.LANGUAGE_DEFAULT,
}

export const STORE_KEY = "GLOBAL.I18N"

export const reducer = (state = defaultState, { type, payload = {} }) => {
  switch (type) {
    case `${STORE_KEY}.SET`:
      return {
        ...state,
        ...payload,
      }

    default:
      return state
  }
}

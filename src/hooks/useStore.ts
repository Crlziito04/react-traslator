import { useReducer } from "react";
import { Action, Language, State, fromLanguage } from "../type";

export const initialState = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

export function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === "INTERCHANGE_LANG") {
    if (state.fromLanguage === "auto") return state;

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === "SET_FROM_LANG") {
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }

  if (type === "SET_TO_LANG") {
    return {
      ...state,
      toLanguage: action.payload,
    };
  }

  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      fromLanguage: action.payload,
    };
  }

  return state;
}

export function useStore() {
  const [{ fromLanguage, fromText, toLanguage, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  const interchangeLang = () => {
    dispatch({ type: "INTERCHANGE_LANG" });
  };

  const setFromLang = (payload: fromLanguage) => {
    dispatch({ type: "SET_FROM_LANG", payload });
  };

  const setToLang = (payload: Language) => {
    dispatch({ type: "SET_TO_LANG", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };

  return {
    fromLanguage,
    fromText,
    toLanguage,
    result,
    loading,
    setFromLang,
    setFromText,
    setResult,
    setToLang,
    interchangeLang,
  };
}

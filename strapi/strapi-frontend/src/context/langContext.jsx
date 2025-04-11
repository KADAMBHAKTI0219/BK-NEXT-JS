// langContext.js
'use client'
import { createContext, useState } from "react";

export const langContextt = createContext();

export const LangContextProvider = ({ children }) => {
  const [selectLang, setSelectLang] = useState("en"); // use 'en' or 'hi-IN' directly

  const getLocalized = (item, field) => {
    if (selectLang === "hi-IN") {
      const hindiVersion = item.localizations?.find(loc => loc.locale === "hi-IN");
      return hindiVersion?.[field] || item[field];
    }
    return item[field];
  };

  return (
    <langContextt.Provider value={{
      selectLang,
      setSelectLang,
      getLocalized
    }}>
      {children}
    </langContextt.Provider>
  );
};

'use client'
const { createContext, useState } = require("react");

// cpc
export const langContextt = createContext();
export const LangContextProvider = ({ children }) => {
    const [selectLang, setSelectLang] = useState("English")
    const getLocalized = (item, field) => {
        if (selectLang === "Hindi") {
          const hindiVersion =item.localizations?.find(loc => loc.locale === "hi-IN")
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
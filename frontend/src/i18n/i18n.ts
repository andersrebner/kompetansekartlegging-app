import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { english } from "./locales/en";
import { norwegian } from "./locales/no";
import { ReactComponent as NorwegianFlag } from "./flags/Norwegian.svg";
import { ReactComponent as UnitedKingdom } from "./flags/UnitedKingdom.svg";

type languageType = {
    nativeName: string,
    flag: React.FunctionComponent
}

export const availableLanguages: Record<string, languageType> = {
    "en": { "nativeName" : "ENGLISH", "flag": UnitedKingdom },
    "no": { "nativeName" : "NORSK", "flag": NorwegianFlag }
}

i18next
    .use(initReactI18next)
    .init({
        debug: false,
        fallbackLng: "en",
        resources: {
            en: english,
            no: norwegian
        }
    });

const locallyStoredLanguage = localStorage.getItem("language");

if (locallyStoredLanguage) {
    i18next.changeLanguage(locallyStoredLanguage);
} else {
    i18next.changeLanguage("no");
}

export default i18next;

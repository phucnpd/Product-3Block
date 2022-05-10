// '@mui
import { enUS } from '@mui/material/locale';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'Viet Nam',
    value: 'vn',
    systemValue: enUS,
    icon: 'https://votuenam.github.io/image-hosting/vn.png',
  },
  // {
  //   label: 'German',
  //   value: 'de',
  //   systemValue: deDE,

  //   icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_de.svg',
  // },
  // {
  //   label: 'French',
  //   value: 'fr',
  //   systemValue: frFR,
  //   icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_fr.svg',
  // },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}

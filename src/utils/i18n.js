import I18n from 'react-native-i18n';

import en from '../../locales/en.json';
import fr from '../../locales/fr.json';

I18n.fallbacks = true;
I18n.translations = {
  en,
  fr,
};

export function strings(name, params = {}) {
  return I18n.t(name, params);
}

// I18n.locale = 'fr'; // Add this for testing purpose

export default I18n;

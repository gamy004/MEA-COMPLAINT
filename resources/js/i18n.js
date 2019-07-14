import VueI18n from 'vue-i18n'
import * as messages from "./localization";

Vue.use(VueI18n);

// Create VueI18n instance with options
export default new VueI18n({
    locale: 'th', // set locale
    messages, // set locale messages
});

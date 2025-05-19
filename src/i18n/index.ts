import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { en_US } from './en_US';
import { zh_CN } from './zh_CN';

// 更新HTML中的静态文本元素
const updateStaticTexts = () => {
  // 更新文档标题
  document.title = i18n.t('app.title');

  // 更新所有带有data-i18n属性的元素
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      // 对于meta标签的特殊处理
      if (element.tagName.toLowerCase() === 'meta') {
        if (element.getAttribute('name') === 'description') {
          element.setAttribute('content', i18n.t(key));
        }
      } else {
        // 普通元素直接更新内容
        element.textContent = i18n.t(key);
      }
    }
  });
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en_US
      },
      zh: {
        translation: zh_CN
      }
    },
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['htmlTag', 'navigator']
    }
  });

i18n.on('initialized', () => {
  updateStaticTexts();
});

i18n.on('languageChanged', () => {
  updateStaticTexts();
});

export { i18n, updateStaticTexts };

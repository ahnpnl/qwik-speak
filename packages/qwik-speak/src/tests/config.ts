import { inlinedQrl } from '@builder.io/qwik';
import type { SpeakLocale, SpeakConfig, Translation, SpeakState } from '../types';

const translationData: Translation = {
  'en-US': {
    test: 'Test',
    testParams: 'Test {{param}}',
    nested: {
      test: 'Test',
      array: ['Test1', 'Test2'],
    },
    one: 'One {{ role }} developer',
    other: '{{value}} {{ role }} developers',
    arrayObjects: [
      { one: '1' },
      { two: '3' }
    ]
  }
};

const config: SpeakConfig = {
  defaultLocale: { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles', units: { 'length': 'mile' } },
  supportedLocales: [
    { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles', units: { 'length': 'mile' } }
  ],
  assets: [],
  keySeparator: '.',
  keyValueSeparator: '@@'
};

const locale: SpeakLocale = {
  lang: 'en-US',
  currency: 'USD',
  timeZone: 'America/Los_Angeles',
  units: { 'length': 'mile' }
};

export const ctx: SpeakState = new Proxy({
  locale: locale,
  translation: translationData,
  config: config,
  translationFn: {
    loadTranslation$: inlinedQrl(() => { return null; }, 'loadTranslation')
  }
}, {});

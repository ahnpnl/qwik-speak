# Testing

> Unit test a Qwik component using Qwik Speak

To unit test a component which uses `qwik-speak`, you need to wrap it with `QwikSpeakProvider` component, so that it can pass the `SpeakContext` to the test component and its children.

Given the `config` object and a component to test like in [Quick Start](./quick-start.md):

_src/routes/index.tsx_
```jsx
import {
  $translate as t,
  formatDate as fd,
  formatNumber as fn,
  Speak,
} from 'qwik-speak';

export const Home = component$(() => {
  return (
    <>
      <h1>{t('app.title@@{{name}} demo', { name: 'Qwik Speak' })}</h1>

      <h3>{t('home.dates@@Dates')}</h3>
      <p>{fd(Date.now(), { dateStyle: 'full', timeStyle: 'short' })}</p>

      <h3>{t('home.numbers@@Numbers')}</h3>
      <p>{fn(1000000, { style: 'currency' })}</p>
    </>
  );
});

export default component$(() => {
  return (
    <Speak assets={['home']}>
      <Home />
    </Speak>
  );
});
```

We'll have the following unit test (using _Vitest_):

_src/routes/index.spec.tsx_
```jsx
import Home from './index';

test(`[Home Component]: Should render the component`, async () => {
  const { screen, render } = await createDOM();

  await render(
    <QwikSpeakProvider config={config}>
      <Home />
    </QwikSpeakProvider>
  );

  expect(screen.outerHTML).toContain('Qwik Speak demo');
});
```

Optionally, if you need to test the translated texts in different languages, you have to provide a `loadTranslation$` to ensure translations are loaded in test environment, and pass it with the language you want to `QwikSpeakProvider`:

```jsx
test(`[Home Component]: Should render translated texts in Italian`, async () => {
  const { screen, render } = await createDOM();

  await render(
    <QwikSpeakProvider config={config} translationFn={translationFn} locale={{ lang: 'it-IT', currency: 'EUR', timeZone: 'Europe/Rome' }}>
      <Home />
    </QwikSpeakProvider>
  );

  expect(screen.outerHTML).toContain('Qwik Speak dimostrazione');
});
```
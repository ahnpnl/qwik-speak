import { component$, useStyles$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { $translate as t, useSpeakConfig, useSpeakLocale } from 'qwik-speak';

import { ChangeLocale } from './change-locale';

import styles from './header.css?inline';

export const Header = component$(() => {
  useStyles$(styles);

  const pathname = useLocation().url.pathname;
  const lang = useSpeakLocale().lang;
  const config = useSpeakConfig();

  const getHref = (name: string) => {
    return lang === config.defaultLocale.lang ? name : `/${lang}${name}`
  };

  return (
    <header>
      <div class="header-inner">
        <section class="logo">
          <Link href={getHref('/')}>Qwik Speak ⚡️</Link>
        </section>
        <nav>
          <Link href={getHref('/')}
            class={{ active: pathname === '/' || config.supportedLocales.some(x => pathname.endsWith(`${x.lang}/`)) }}>
            {t('app.nav.home')}
          </Link>
          <Link href={getHref('/page')}
            class={{ active: pathname.endsWith('/page/') }}>
            {t('app.nav.page')}
          </Link>
        </nav>
        <ChangeLocale />
      </div>
    </header>
  );
});

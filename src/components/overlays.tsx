import {
  IconoirProvider,
  GithubCircle,
  OffTag,
  OnTag,
  ZoomIn,
  ZoomOut,
  Restart
} from 'iconoir-react';
import { useTranslation } from 'react-i18next';

import { useStore } from '@/store';

export default function Overlays() {
  const store = useStore();
  const { t } = useTranslation();

  return (
    <IconoirProvider iconProps={{ strokeWidth: 2, width: '1em', height: '1em' }}>
      <div className='fixed top-0 left-0 p-5 z-1000'>
        <div className='text-xl font-semibold select-none'>
          <a
            href='https://github.com/RookieZoe/network-cabinet'
            target='_blank'
            className='flex items-center gap-1 text-emerald-500 animate-bounce'
          >
            <GithubCircle />
            <span>{t('app.title')}</span>
          </a>

          {/* <div className='text-zinc 10ext-lg'>Still Working 🚧</div> */}
        </div>
      </div>

      <div className='fixed right-0 bottom-0 p-5 z-1000 text-emerald-500 flex flex-col items-end gap-2'>
        <span className='text-2xl flex flex-col items-end gap-2 cursor-pointer'>
          <ZoomIn
            className={store.distance > 0.65 ? 'text-emerald-500' : 'text-gray-400'}
            onClick={e => {
              e.stopPropagation();
              store.distance = Math.max(store.distance - 1.235, 0.65);
            }}
          />
          <Restart
            className='text-emerald-500 text-2xl'
            onClick={e => {
              e.stopPropagation();
              store.distance = 6.5;
              store.resetToggle = !store.resetToggle;
            }}
          />
          <ZoomOut
            className={store.distance < 13 ? 'text-emerald-500' : 'text-gray-400'}
            onClick={e => {
              e.stopPropagation();
              store.distance = Math.min(store.distance + 1.235, 13);
            }}
          />
        </span>

        <label htmlFor='explosive' className='flex items-center gap-1 cursor-pointer'>
          <input
            id='explosive'
            type='checkbox'
            checked={store.explosive}
            onChange={e => (store.explosive = e.target.checked)}
            className='hidden'
          />
          <span className='text-base'>{t('app.explodedView')}</span>
          {store.explosive ? <OnTag className='text-2xl' /> : <OffTag className='text-2xl' />}
        </label>
      </div>
    </IconoirProvider>
  );
}

import classnames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/store';
import { Xmark } from 'iconoir-react';
import { useTranslation } from 'react-i18next';
import useTypewriter from '@/hooks/useTypewriter';
import usePopupPositioning from '@/hooks/usePopupPositioning';

const Cursor = () => (
  <span className='inline-block align-text-bottom ps-2 w-1.5 h-4 bg-emerald-500 ml-0.5 animate-blink'></span>
);

const InfoDisplay = () => {
  const { t } = useTranslation();
  const store = useStore();
  const { selectedModel, clickPosition, infoShow } = store;
  const [isClosing, setIsClosing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const position = usePopupPositioning(containerRef, infoShow, clickPosition);

  const titleTypewriter = useTypewriter(selectedModel?.name || '', 80, 300);
  const descriptionTypewriter = useTypewriter(
    selectedModel?.description || '',
    30,
    titleTypewriter.isComplete ? 500 : 3000
  );
  const sizeTypewriter = useTypewriter(
    selectedModel
      ? `${t('app.size')}${selectedModel.size.width}${selectedModel.size.unit} × ${selectedModel.size.depth}${selectedModel.size.unit} × ${selectedModel.size.height}${selectedModel.size.unit}`
      : '',
    40,
    descriptionTypewriter.isComplete ? 500 : 15000
  );

  useEffect(() => {
    if (isClosing && containerRef.current) {
      const handleAnimationEnd = () => {
        store.infoShow = false;
        store.selectedModel = null;
        store.clickPosition = null;
        setIsClosing(false);
      };

      const container = containerRef.current;
      container?.addEventListener?.('animationend', handleAnimationEnd, { once: true });

      // Clean up the event listener if the component unmounts during animation
      return () => {
        container?.removeEventListener?.('animationend', handleAnimationEnd);
      };
    }
  }, [isClosing, store]);

  useEffect(() => {
    if (!store.explosive) {
      setIsClosing(true);
    }
  }, [store.explosive]);

  if (!selectedModel || (!infoShow && !isClosing)) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={position}
      className={classnames([
        'fixed z-[2000]',
        { 'animate-crtTurnOff': isClosing },
        { 'animate-fadeIn': !isClosing }
      ])}
    >
      <div
        className={classnames([
          'relative w-75 overflow-hidden border border-emerald-500/30',
          'bg-slate-800/60 backdrop-blur-md rounded-lg shadow-lg',
          { 'animate-crtContentFlicker': isClosing }
        ])}
      >
        <button
          title='Close'
          onClick={() => setIsClosing(true)}
          className={classnames([
            'absolute top-2 right-2 text-slate-400 transition-colors duration-200',
            'hover:text-emerald-500 cursor-pointer'
          ])}
          aria-label='Close'
        >
          <Xmark width='1.2em' height='1.2em' />
        </button>
        <div className='p-4 text-slate-200'>
          <h3 className='text-emerald-500 font-bold mb-3 '>
            {titleTypewriter.text}
            {!titleTypewriter.isComplete && <Cursor />}
          </h3>

          <div className='mb-3 min-h-6 indent-[2em] '>
            {descriptionTypewriter.text}
            {titleTypewriter.isComplete && !descriptionTypewriter.isComplete && <Cursor />}
          </div>

          <div className='text-sm text-emerald-300 '>
            {sizeTypewriter.text}
            {descriptionTypewriter.isComplete && !sizeTypewriter.isComplete && <Cursor />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDisplay;

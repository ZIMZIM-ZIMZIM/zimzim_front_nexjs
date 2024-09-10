import i18n from 'i18n';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '#/components/common/Button';

import { LOCAL_STORAGE, MODAL } from '#/constants/key';

import { useModal } from '#/app/ModalContext';

interface LanguageSelectModal {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LanguageSelectModal = () => {
  const { t } = useTranslation();
  const { deleteModal } = useModal();

  return (
    <div className="modal flex flex-col items-center gap-6">
      <h1 className="text-xl">{t('MODAL.SELECT_LANGUAGE.TITLE')}</h1>
      <section className="modal flex flex-col gap-4">
        <Button
          className="modal bg-primary/25 border-1 rounded-md px-24 py-2 hover:bg-primary/75"
          onClick={() => {
            i18n.changeLanguage('en');
            localStorage.setItem(LOCAL_STORAGE.LANGUAGE, 'en');
            deleteModal(MODAL.LANGUGAGE_SELECT);
          }}
        >
          {t('MODAL.SELECT_LANGUAGE.OPTION.EN')}
        </Button>
        <Button
          className="modal bg-primary/25 border-1 rounded-md px-24 py-2 hover:bg-primary/75"
          onClick={() => {
            i18n.changeLanguage('ko');
            localStorage.setItem(LOCAL_STORAGE.LANGUAGE, 'ko');
            deleteModal(MODAL.LANGUGAGE_SELECT);
          }}
        >
          {t('MODAL.SELECT_LANGUAGE.OPTION.KO')}
        </Button>
      </section>
    </div>
  );
};

export default LanguageSelectModal;

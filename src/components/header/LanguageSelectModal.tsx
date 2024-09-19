import { usePathname } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '#/components/common/Button';

import { LOCAL_STORAGE, MODAL } from '#/constants/key';

import { useModal } from '#/app/ModalContext';
import { Language } from '#/app/types';

interface LanguageSelectModal {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LanguageSelectModal = () => {
  const { t, i18n } = useTranslation();

  const { deleteModal } = useModal();

  const pathname = usePathname();

  const handleChangeLangugage = (language: Language) => {
    const originalPath = pathname.split(i18n.language)[1];

    i18n.changeLanguage(language);

    localStorage.setItem(LOCAL_STORAGE.LANGUAGE, language);
    location.replace(`/${language}${originalPath}`);

    deleteModal(MODAL.LANGUGAGE_SELECT);
  };

  return (
    <div className="modal flex flex-col items-center gap-6">
      <h1 className="text-xl">{t('MODAL.SELECT_LANGUAGE.TITLE')}</h1>
      <section className="modal flex flex-col gap-4">
        <Button
          className="modal bg-primary/25 border-1 rounded-md px-24 py-2 hover:bg-primary/75"
          onClick={() => handleChangeLangugage('en')}
        >
          {t('MODAL.SELECT_LANGUAGE.OPTION.EN')}
        </Button>
        <Button
          className="modal bg-primary/25 border-1 rounded-md px-24 py-2 hover:bg-primary/75"
          onClick={() => handleChangeLangugage('ko')}
        >
          {t('MODAL.SELECT_LANGUAGE.OPTION.KO')}
        </Button>
      </section>
    </div>
  );
};

export default LanguageSelectModal;

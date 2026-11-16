import React from 'react';
import { useModal } from '../../context/ModalContext';
import { VideoModal } from './VideoModal';
import { VenueModal } from './VenueModal';

export function ModalContainer() {
  const { activeModal, closeModal, modalProps } = useModal();

  return (
    <>
      <VenueModal
        isOpen={activeModal === 'venue' || activeModal === 'booking'}
        onClose={closeModal}
        {...modalProps}
      />
      <VideoModal
        isOpen={activeModal === 'video'}
        onClose={closeModal}
        {...modalProps}
      />
    </>
  );
}

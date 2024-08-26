import React, { createContext, useState, useContext } from 'react';
import DynamicModal from './CustomModal';
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    heading: '',
    message: '',
    primaryButtonText: '',
    onPrimaryButtonPress: () => {},
    secondaryButtonText: '',
    onSecondaryButtonPress: () => {},
  });

  const showModal = ({
    heading = '',
    message = '',
    primaryButtonText = '',
    onPrimaryButtonPress = () => {},
    secondaryButtonText = '',
    onSecondaryButtonPress = () => {},
  }) => {
    setModalContent({
      heading,
      message,
      primaryButtonText,
      onPrimaryButtonPress,
      secondaryButtonText,
      onSecondaryButtonPress,
    });
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {isVisible && (
        <DynamicModal
          isVisible={isVisible}
          onClose={hideModal}
          heading={modalContent.heading}
          message={modalContent.message}
          primaryButtonText={modalContent.primaryButtonText}
          onPrimaryButtonPress={() => {
            modalContent.onPrimaryButtonPress();
            hideModal(); // Hide the modal after the primary button is pressed
          }}
          secondaryButtonText={modalContent.secondaryButtonText}
          onSecondaryButtonPress={() => {
            modalContent.onSecondaryButtonPress();
            hideModal(); // Hide the modal after the secondary button is pressed
          }}
        />
      )}
    </ModalContext.Provider>
  );
};

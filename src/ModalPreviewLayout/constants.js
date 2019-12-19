const modalPrefix = 'preview-modal';

export const modalPreviewIDs = {
  overlay: `${modalPrefix}-overlay`,
  innerOverlay: `${modalPrefix}-inner-overlay`,
};

export const arrowsDirection = {
  rightArrow: 'right-arrow',
  leftArrow: 'left-arrow',
};

export const dataHooks = {
  modalPreviewActions: `${modalPrefix}-actions`,
  modalPreviewCloseButton: `${modalPrefix}-close-button`,
  modalPreviewTitle: `${modalPrefix}-title`,
  modalPreviewContent: `${modalPrefix}-content`,
  overlay: `${modalPrefix}-overlay`,
  innerOverlay: `${modalPrefix}-inner-overlay`,
  modalPreviewRightArrow: `${modalPrefix}-${arrowsDirection.rightArrow}`,
  modalPreviewLeftArrow: `${modalPrefix}-${arrowsDirection.leftArrow}`,
  ...modalPreviewIDs,
};

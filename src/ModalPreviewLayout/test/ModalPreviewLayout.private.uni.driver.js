import { modalPreviewLayoutDriverFactory as publicDriverFactory } from '../ModalPreviewLayout.uni.driver';
import { iconButtonDriverFactory } from '../../IconButton/IconButton.uni.driver';
import { dataHooks } from '../constants';

export const modalPreviewLayoutPrivateDriverFactory = base => {
  const rightArrow = base.$(
    `[data-hook="${dataHooks.modalPreviewRightArrow}"]`,
  );
  const leftArrow = base.$(`[data-hook="${dataHooks.modalPreviewLeftArrow}"]`);

  const rightNavigationButtonUniDriver = iconButtonDriverFactory(rightArrow);
  const leftNavigationButtonUniDriver = iconButtonDriverFactory(leftArrow);

  const getContent = () =>
    base.$(`[data-hook="${dataHooks.modalPreviewContent}"]`);

  return {
    ...publicDriverFactory(base),
    clickRightNavigationButton: rightNavigationButtonUniDriver.click,
    clickLeftNavigationButton: leftNavigationButtonUniDriver.click,
    getCurrentChildIndex: async () =>
      Number(await getContent().attr('data-index')),
  };
};

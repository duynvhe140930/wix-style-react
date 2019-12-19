import React from 'react';
import IconButton from '../../IconButton';
import ChevronLeft from 'wix-ui-icons-common/ChevronLeft';
import ChevronRight from 'wix-ui-icons-common/ChevronRight';
import { arrowsDirection } from '../constants';
import styles from '../ModalPreviewLayout.st.css';
import classNames from 'classnames';

const NavigationButton = ({ direction, onClick }) => (
  <div className={classNames(styles.navigationButton, styles[direction])}>
    <IconButton
      as="button"
      onClick={onClick}
      skin="transparent"
      dataHook={`modal-preview-${direction}`}
    >
      {direction === arrowsDirection.rightArrow ? (
        <ChevronRight />
      ) : (
        <ChevronLeft />
      )}
    </IconButton>
  </div>
);

export default NavigationButton;

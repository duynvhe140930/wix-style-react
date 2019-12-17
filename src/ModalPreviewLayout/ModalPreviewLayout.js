import React from 'react';
import { string, node, oneOfType, arrayOf, func, bool } from 'prop-types';
import X from 'wix-ui-icons-common/X';
import ChevronLeft from 'wix-ui-icons-common/ChevronLeft';
import ChevronRight from 'wix-ui-icons-common/ChevronRight';
import Text from '../Text';
import IconButton from '../IconButton';
import styles from './ModalPreviewLayout.st.css';
import { dataHooks, modalPreviewIDs } from './constants';

/** This is a fullscreen modal to present a document to the user overlaying the entire view port */
class ModalPreviewLayout extends React.PureComponent {
  static displayName = 'ModalPreviewLayout';

  static propTypes = {
    dataHook: string,
    /** component to be displayed in header strip to preform actions relevant to the displayed content */
    actions: node,
    /** title text to be displayed in the header strip */
    title: string,
    /** modal content displayed mid-screen*/
    children: oneOfType([node, arrayOf(node)]).isRequired,
    /** callback for when the modal is closed */
    onClose: func.isRequired,
    /** */
    shouldCloseOnOverlayClick: bool,
  };

  static defaultProps = {
    shouldCloseOnOverlayClick: true,
  };

  state = { childIndexDisplayed: 0 };

  shouldClose(id) {
    return (
      this.props.shouldCloseOnOverlayClick &&
      [modalPreviewIDs.overlay, modalPreviewIDs.innerOverlay].includes(id)
    );
  }

  _onArrowClick = () => {};

  render() {
    const { dataHook, actions, title, children, onClose } = this.props;
    const { childIndexDisplayed } = this.state;

    return (
      <div
        id={modalPreviewIDs.overlay}
        className={styles.overlay}
        onClick={({ target: { id } }) => {
          if (this.shouldClose(id) && typeof onClose === 'function') {
            onClose();
          }
        }}
      >
        <div data-hook={dataHook} className={styles.header}>
          <div data-hook={dataHooks.modalPreviewTitle} className={styles.title}>
            <Text light ellipsis>
              {title}
            </Text>
          </div>
          <div
            className={styles.actions}
            data-hook={dataHooks.modalPreviewActions}
          >
            {actions}
          </div>
          <div className={styles.closeButton}>
            <IconButton
              as="button"
              onClick={onClose}
              priority="secondary"
              skin="transparent"
              dataHook={dataHooks.modalPreviewCloseButton}
            >
              <X />
            </IconButton>
          </div>
        </div>
        <div
          id={modalPreviewIDs.innerOverlay}
          data-hook={dataHooks.innerOverlay}
          className={styles.innerOverlay}
        >
          {childIndexDisplayed && (
            <div className={styles.leftArrow}>
              <IconButton
                as="button"
                onClick={this._onArrowClick}
                skin="transparent"
                dataHook={dataHooks.modalPreviewLeftArrow}
              >
                <ChevronLeft />
              </IconButton>
            </div>
          )}
          <div
            data-hook={dataHooks.modalPreviewContent}
            className={styles.content}
          >
            {children}
          </div>
          {childIndexDisplayed < children.length - 1 && (
            <div className={styles.rightArrow}>
              <IconButton
                as="button"
                onClick={this._onArrowClick}
                skin="transparent"
                dataHook={dataHooks.modalPreviewRightArrow}
              >
                <ChevronRight />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ModalPreviewLayout;

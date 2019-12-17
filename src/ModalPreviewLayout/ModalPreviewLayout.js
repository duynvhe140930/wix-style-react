import React from 'react';
import { string, node, oneOfType, arrayOf, func, bool } from 'prop-types';
import X from 'wix-ui-icons-common/X';
import Text from '../Text';
import IconButton from '../IconButton';
import styles from './ModalPreviewLayout.st.css';
import { dataHooks, modalPreviewIDs, arrowsDirection } from './constants';
import NavigationButton from './NavigationButton/NavigationButton';

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

  _onArrowClick(direction) {
    const { childIndexDisplayed } = this.state;
    direction === arrowsDirection.rightArrow
      ? this.setState({ childIndexDisplayed: childIndexDisplayed + 1 })
      : this.setState({ childIndexDisplayed: childIndexDisplayed - 1 });
  }

  render() {
    const { dataHook, actions, title, children, onClose } = this.props;
    const { childIndexDisplayed } = this.state;
    const isMultipleChildNodes = children.length > 0;
    const isLastChildNode = childIndexDisplayed < children.length - 1;

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
            <NavigationButton
              direction={arrowsDirection.leftArrow}
              onClick={() => this._onArrowClick(arrowsDirection.leftArrow)}
            />
          )}
          <div
            data-hook={dataHooks.modalPreviewContent}
            className={styles.content}
          >
            {isMultipleChildNodes ? children[childIndexDisplayed] : children}
          </div>
          {isLastChildNode && (
            <NavigationButton
              direction={arrowsDirection.rightArrow}
              onClick={() => this._onArrowClick(arrowsDirection.rightArrow)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ModalPreviewLayout;

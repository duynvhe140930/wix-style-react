import React, { Component } from 'react';
import More from 'wix-ui-icons-common/More';
import classnames from 'classnames';
import {
  oneOf,
  oneOfType,
  bool,
  element,
  instanceOf,
  number,
  string,
  func,
  shape,
} from 'prop-types';

import styles from './PopoverMenu.scss';
import Tooltip from '../Tooltip';
import Button from '../Deprecated/Button';
import PopoverMenuItem from '../PopoverMenuItem';
import deprecationLog from '../utils/deprecationLog';

class PopoverMenu extends Component {
  static displayName = 'PopoverMenu';

  static propTypes = {
    /** Sets size for the popover itself */
    size: oneOf(['normal', 'large']),
    /** A direction the popover will be opened */
    placement: oneOf(['top', 'right', 'bottom', 'left']),
    /** Sets theme for the button */
    buttonTheme: oneOf([
      'icon-greybackground',
      'icon-standard',
      'icon-standardsecondary',
      'icon-white',
      'icon-whitesecondary',
    ]),
    /** Sets size for the button */
    buttonHeight: oneOf(['small', 'medium', 'large']),
    /** Sets max width for the popover  */
    maxWidth: oneOfType([string, number]),
    /**
     * In some cases when you need a popover scroll with your element, you can append the popover to the direct parent, just
     * don't forget to apply `relative`, `absolute` positioning. And be aware that some of your styles may leak into
     * popover content
     */
    appendToParent: bool,
    /** An element which will contain the popover  */
    appendTo: oneOfType([
      element,
      instanceOf(Element),
      func,
      oneOf(['window', 'scrollParent', 'viewPort', 'parent']),
    ]),
    /** Sets a zIndex to the popover  */
    zIndex: number,
    showArrow: bool,
    onShow: func,
    onHide: func,
    /**
     * Allows to shift the tooltip position by x and y pixels.
     * Both positive and negative values are accepted.
     */
    moveBy: shape({
      x: number,
      y: number,
    }),

    /** add data-hook for button*/
    dataHook: string,
  };

  static defaultProps = {
    size: 'normal',
    placement: 'top',
    buttonTheme: 'icon-greybackground',
    buttonHeight: 'medium',
    maxWidth: '378px',
    appendToParent: false,
    showArrow: true,
  };

  componentDidMount() {
    deprecationLog(
      'Using "PopoverMenu" with current API is deprecated. In order to upgrade to the new PopoverMenu API make sure to import it from /beta section and follow "7.3 PopoverMenu" UX story or "BETA/Popovermenu" API story guidelines.',
    );
  }

  _menuItems = items =>
    React.Children.map(items, (item, i) => {
      if (!item) {
        return null;
      }

      return (
        <PopoverMenuItem
          {...item.props}
          size={this.props.size}
          key={i}
          onClick={() => {
            this.tooltip.hide();
            item.props.onClick();
          }}
        />
      );
    });

  _menu = () => (
    <ul
      className={classnames(styles.menu, {
        [styles.large]: this.props.size === 'large',
        [styles.placementTop]: this.props.placement === 'top',
        [styles.placementBottom]: this.props.placement === 'bottom',
      })}
    >
      {this._menuItems(this.props.children)}
    </ul>
  );

  render() {
    const {
      placement,
      size,
      maxWidth,
      buttonHeight,
      buttonTheme,
      dataHook,
    } = this.props;

    return (
      <Tooltip
        ref={tooltip => (this.tooltip = tooltip)}
        dataHook={dataHook}
        placement={placement}
        alignment="center"
        content={this._menu()}
        showTrigger="click"
        hideTrigger="click"
        showDelay={0}
        hideDelay={0}
        theme="light"
        size={size}
        padding={0}
        maxWidth={maxWidth}
        shouldCloseOnClickOutside
        appendTo={this.props.appendTo}
        appendToParent={this.props.appendToParent}
        zIndex={this.props.zIndex}
        showArrow={this.props.showArrow}
        onShow={this.props.onShow}
        onHide={this.props.onHide}
        moveBy={this.props.moveBy}
      >
        <Button type="button" height={buttonHeight} theme={buttonTheme}>
          <More />
        </Button>
      </Tooltip>
    );
  }
}

export default PopoverMenu;

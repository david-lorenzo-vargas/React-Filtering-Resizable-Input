import React from 'react';
import classnames from 'classnames/bind';
import styles from './tooltip.scss';

const cx = classnames.bind(styles);

const Tooltip = (props) => {
  const {
    type, right, left, text, active, typeActive,
  } = props;

  const tooltipPosition = {
    left: `${left}%`,
    right: `${right}%`,
  };

  return (
    <div
      type={type}
      className={cx('tooltip', {
        [`tooltip--type-${type}`]: true,
        'tooltip--active-left': type === 'left' && active && typeActive === 'left',
        'tooltip--active-right': type === 'right' && active && typeActive === 'right',
        'tooltip--active': typeActive === 'bar',
      })}
      style={tooltipPosition}
    >
      <span className={styles['tooltip-text']}>
        {text}
      </span>
    </div>
  );
};

export default Tooltip;

import React from 'react';
import Toggle from '../toggle';
import Bar from '../bar';
import Tooltip from '../tooltip';
import styles from './range-input.scss';

const convertLeftIntoPercentage = (amount, maxValue) => (maxValue / 100) * amount;

const convertRightIntoPercentage = (amount, maxValue) => {
  const newAmount = (100 - Math.abs(amount));

  return (maxValue / 100) * newAmount;
};

const getValuePercentage = (props) => {
  const { minValue, maxValue, value } = props;
  const percentage = ((100 / (maxValue - minValue)) * (value.min - minValue));

  return percentage;
};

const getRightValuePercentage = (props) => {
  const { maxValue, value } = props;
  const percentage = (((100 / maxValue) * value.max) - 100) * -1;

  return percentage;
};

export const getCoordinates = (props) => {
  const { value } = props;

  if (!value) {
    return {};
  }

  const leftPercent = getValuePercentage(props);
  const rightPercent = getRightValuePercentage(props);
  const widthPercent = Math.round(100 - (leftPercent + rightPercent));

  return {
    leftPercent,
    rightPercent,
    widthPercent,
  };
};

const getMagnetValue = (percentage, spaces) => {
  const step = 100 / spaces;
  const rounded = (Math.round(percentage / step)) * step;

  return rounded;
};

class RangeInput extends React.Component {
  constructor(props) {
    super(props);
    const { leftPercent, rightPercent } = getCoordinates(props);

    this.state = {
      isMouseActive: false,
      toogleActive: '',
      type: '',
      left: leftPercent,
      lastLeftPosition: 0,
      right: rightPercent,
      width: 100,
      mouseDistance: 0,
    };

    this.inputRangeRef = React.createRef();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleBarMouseDown = this.handleBarMouseDown.bind(this);
  }

  // Events
  // ===================================

  getWidthPercentage() {
    const { left, right } = this.state;
    const selectedWidth = 100 - (left + right);
    return selectedWidth;
  }

  static getDerivedStateFromProps(props, state) {
    const { left, right, isMouseActive } = state;
    const { sticky, spaces } = props;
    const { leftPercent, rightPercent, widthPercent } = getCoordinates(props);

    const haveCoordinatesChanged = (
      leftPercent !== left ||
      rightPercent !== right
    );

    const newLeft = sticky ? getMagnetValue(leftPercent, spaces) : leftPercent;
    const newRight = sticky ? getMagnetValue(rightPercent, spaces) : rightPercent;
    const newWidth = sticky ? (100 - (newLeft + newRight)) : widthPercent;

    if (haveCoordinatesChanged && !isMouseActive) {
      return {
        left: newLeft,
        right: newRight,
        width: newWidth,
      };
    }

    return null;
  }

  calculatePercentage(value, width) {
    return (value * 100) / (width);
  }

  handleMouseUp() {
    const { type, left } = this.state;

    if (type === 'left') {
      this.setState({
        isMouseActive: false,
        type: '',
        toogleActive: '',
      });
    }

    if (type === 'right') {
      this.setState({
        isMouseActive: false,
        type: '',
        toogleActive: '',
      });
    }

    if (type === 'bar') {
      this.setState({
        isMouseActive: false,
        toogleActive: '',
        type: '',
        mouseDistance: 0,
        lastLeftPosition: left,
      });
    }

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown(type) {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState({
      isMouseActive: true,
      type,
      toogleActive: type,
    });
  }

  handleToggleLeftMove(event) {
    const { right } = this.state;
    const { sticky, spaces } = this.props;
    const { width, left } = this.inputRangeRef.current.getBoundingClientRect();
    const value = event.clientX - left;
    const percentage = this.calculatePercentage(value, width);
    const magnetValue = getMagnetValue(percentage, spaces);
    const newLeft = sticky ? magnetValue : percentage;

    const isExceedingThresholds = (
      percentage < 0 ||
      percentage > 100 ||
      (percentage + right) > 100
    );

    if (isExceedingThresholds) {
      return;
    }

    this.setState({
      left: newLeft,
      width: 100 - (newLeft + right),
    });
  }

  handleToggleRightMove(event) {
    const { left } = this.state;
    const { sticky, spaces } = this.props;
    const bounds = this.inputRangeRef.current.getBoundingClientRect();
    const value = (event.clientX - (bounds.left + bounds.width)) * -1;
    const percentage = this.calculatePercentage(value, bounds.width);
    const magnetValue = getMagnetValue(percentage, spaces);

    const newRight = sticky ? magnetValue : percentage;

    const isExceedingThresholds = (
      percentage < 0 ||
      percentage > 100 ||
      (percentage + left) > 100
    );

    if (isExceedingThresholds) {
      return;
    }

    this.setState({
      right: newRight,
      width: 100 - (newRight + left),
    });
  }

  handleBarMove(event) {
    const { width, mouseDistance, lastLeftPosition } = this.state;
    const { spaces, sticky } = this.props;
    const bounds = this.inputRangeRef.current.getBoundingClientRect();
    const spaceWidth = 100 / spaces;
    const newMouseDistance = mouseDistance + event.movementX;
    const mouseDistanceInPercentage = (newMouseDistance / bounds.width) * 100;
    let newLeftPosition = lastLeftPosition + mouseDistanceInPercentage;
    let newRightPosition = 100 - width - newLeftPosition;

    const isExceedingThresholds = (
      newLeftPosition < 0 ||
      newRightPosition < 0 ||
      newLeftPosition + width > 100 ||
      newRightPosition + width > 100
    );

    if (isExceedingThresholds) {
      return;
    }

    if (sticky) {
      newLeftPosition = Math.round(newLeftPosition / spaceWidth) * spaceWidth;
      newRightPosition = Math.round(newRightPosition / spaceWidth) * spaceWidth;
    }

    this.setState({
      mouseDistance: newMouseDistance,
      left: newLeftPosition,
      right: newRightPosition,
    });
  }

  handleToggleMove(event) {
    const { type } = this.state;

    if (type === 'left') {
      this.handleToggleLeftMove(event);
    } else {
      this.handleToggleRightMove(event);
    }
  }

  handleMouseMove(event) {
    const { maxValue, minValue } = this.props;
    const {
      isMouseActive, type, left, right,
    } = this.state;

    if (type !== 'bar') {
      this.handleToggleMove(event);
    }

    if (isMouseActive && type === 'bar') {
      this.handleBarMove(event);
    }

    const values = {
      left: Math.round(convertLeftIntoPercentage(left, maxValue)) + minValue,
      right: Math.round(convertRightIntoPercentage(right, maxValue)),
      percentage: Math.round(this.getWidthPercentage()),
    };

    this.props.onChange(values);
  }

  handleBarMouseDown(type) {
    const { left } = this.state;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState({
      isMouseActive: true,
      type,
      mouseDistance: 0,
      toogleActive: type,
      lastLeftPosition: left,
    });
  }

  // Render
  // ===================================
  render() {
    const {
      left,
      right,
      width,
      isMouseActive,
      toogleActive,
    } = this.state;
    const { value, minValue, maxValue } = this.props;
    return (
      <div className={styles['range-input']} ref={this.inputRangeRef}>
        <Bar
          left={left}
          right={right}
          type="bar"
          width={width}
          onMouseDown={this.handleBarMouseDown}
        />
        <Tooltip
          left={left}
          type="left"
          text={value.min === '' || value.min === 0 ? minValue : value.min}
          active={isMouseActive}
          typeActive={toogleActive}
        />
        <Toggle
          left={left}
          type="left"
          onMouseDown={this.handleMouseDown}
        />
        <Tooltip
          right={right}
          type="right"
          text={value.max === 0 || value.max === '' ? maxValue : value.max}
          active={isMouseActive}
          typeActive={toogleActive}
        />
        <Toggle
          right={right}
          type="right"
          onMouseDown={this.handleMouseDown}
        />
      </div>
    );
  }
}

export default RangeInput;

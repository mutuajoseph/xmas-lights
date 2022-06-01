import React from 'react';
import styled from 'styled-components';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

interface Props {
  value: number;
  onChange: (newValue: number) => void;
  max: number;
  min?: number;
  formatter?: (value: number) => string | number;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: 1px solid #bcbcbc;
  align-items: center;
  justify-content: space-around;
  & > div:first-child {
    border-radius: 9px 0 0 9px;
    border-right: 1px solid #bcbcbc;
  }
  & > div:last-child {
    border-radius: 0 9px 9px 0;
    border-left: 1px solid #bcbcbc;
  }
`;

const DecreaseIcon = styled(FiChevronLeft)`
  width: 30px;
  height: 30px;
`;

const IncreaseIcon = styled(FiChevronRight)`
  width: 30px;
  height: 30px;
`;

const ValueContainer = styled.span`
  flex: 5;
  color: #333333;
  font-weight: 700;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

const buttonEnabled = `
color: #333333;
@media (hover: hover) {
  &:hover {
    background-color: #e2e2e2;
    cursor: pointer;
  }
}
&:active {
  background-color: #cccccc;
}
`;

const buttonDisabled = `
  color: lightgray
`;

const ButtonContainer = styled.div<{disabled?: boolean}>`
  flex: 4;
  display: flex;
  justify-content: center;
  ${props => (props.disabled ? buttonDisabled : buttonEnabled)}
`;

const NumberSelector: React.FC<Props> = ({
  value,
  onChange,
  formatter,
  max,
  min = 0
}) => {
  const handleDecreaseClick = () =>
    onChange(value - 1 < min ? value : value - 1);
  const handleIncreaseClick = () =>
    onChange(value + 1 > max ? value : value + 1);

  return (
    <Container>
      <ButtonContainer
        onClick={handleDecreaseClick}
        disabled={value === min}
        data-testid="num-selector-decrease-btn"
      >
        <DecreaseIcon />
      </ButtonContainer>
      <ValueContainer data-testid="num-selector-value">
        {formatter ? formatter(value) : value}
      </ValueContainer>
      <ButtonContainer
        onClick={handleIncreaseClick}
        disabled={value === max}
        data-testid="num-selector-increase-btn"
      >
        <IncreaseIcon />
      </ButtonContainer>
    </Container>
  );
};

export default React.memo(NumberSelector);

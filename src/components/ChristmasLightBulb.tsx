import React from 'react';
import styled from 'styled-components';
import {animated, SpringValue} from 'react-spring';

interface Props {
  size: number;
  style: {
    [key: string]: SpringValue<string>;
  };
}

interface ContainerProps {
  size: number;
}

const Container = styled(animated.div).attrs<ContainerProps>(props => ({
  style: {
    width: props.size,
    height: props.size
  }
}))<ContainerProps>`
  border-radius: 50%;
`;

const ChristmasLightBulb: React.FC<Props> = ({style, size}) => {
  return <Container style={style} size={size} data-testid="light-bulb" />;
};

export default React.memo(ChristmasLightBulb);

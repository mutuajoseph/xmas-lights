import React from 'react';
import styled from 'styled-components';
import {animated, useSpring, useTransition} from 'react-spring';

import {Settings} from '../types';
import patterns from '../patterns';
import RowNumberSelector from './NumberSelector';

interface Props {
  isOpen: boolean;
  close: () => void;
  settings: Settings;
  onChange: (newSetting: Partial<Settings>) => void;
}

const Container = styled(animated.div)`
  background-color: white;
  display: grid;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  grid-template-columns: 1fr 1fr;
  border-bottom-left-radius: 10px;
  padding: 0 10px 10px 10px;
  z-index: 20;
  position: fixed;
  top: 0;
  right: 0;
  overflow-y: auto;
  user-select: none;
  @media (max-width: 480px) {
    left: 10vw;
  }
  @media (min-width: 481px) {
    width: 250px;
  }
  @media (orientation: landscape) and (max-height: 480px) {
    grid-template-columns: 1fr 1fr 2fr;
    left: 0;
    border-bottom-left-radius: 0;
    width: auto;
  }

  /* Children styles */
  & > div {
    display: flex;
    flex-direction: column;
  }
  & > div:last-child {
    @media (min-height: 481px), (orientation: portrait) {
      grid-column: 1 / 3;
    }
  }
`;

const Backdrop = styled(animated.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Header = styled.span`
  margin: 5px 0 10px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`;

const ColorPreviewsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ColorPreview = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 10%;
  background-color: ${props => props.color};
`;

const SettingsView: React.FC<Props> = ({settings, isOpen, close, onChange}) => {
  const settingsSringStyles = useSpring({
    transform: `translateY(${isOpen ? 0 : -100}%)`
  });

  const backdropTransitions = useTransition(isOpen, null, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0}
  });

  return (
    <>
      {backdropTransitions.map(
        ({item, key, props}) =>
          item && (
            <Backdrop
              key={key}
              style={props}
              onClick={close}
              data-testid="settings-backdrop"
            />
          )
      )}

      <Container style={settingsSringStyles} data-testid="settings-view">
        <div data-testid="rows-setting-container">
          <Header>Rows</Header>
          <RowNumberSelector
            value={settings.rows}
            onChange={rows => onChange({rows})}
            min={1}
            max={7}
          />
        </div>
        <div data-testid="pattern-setting-container">
          <Header>Pattern</Header>
          <RowNumberSelector
            value={settings.patternIndex}
            min={0}
            max={patterns.length - 1}
            onChange={patternIndex => onChange({patternIndex})}
            formatter={v => `P${v + 1}`}
          />
        </div>
        <div>
          <Header>Colors (read-only)</Header>
          <ColorPreviewsContainer data-testid="color-settings-container">
            {settings.colors.map(color => (
              <ColorPreview key={color.id} color={color.value} />
            ))}
          </ColorPreviewsContainer>
        </div>
      </Container>
    </>
  );
};

export default SettingsView;

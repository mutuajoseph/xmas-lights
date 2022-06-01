import React, {useState} from 'react';
import styled from 'styled-components';
import {FiPlay, FiPause, FiSettings} from 'react-icons/fi';

import {Settings} from './types';
import {assignIdsToArrayItems} from './utils';
import ChristmastLights from './components/ChristmasLights';
import SettingsView from './components/SettingsView';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0px;
  right: 0px;
  padding: 5px;
  transition: 0.3s;
  z-index: 10;
  color: rgba(255, 255, 255, 0.2);
  @media (hover: hover) {
    &:hover {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  & svg {
    width: 8vmin;
    height: 8vmin;
    margin: 5px;
    cursor: pointer;
    &:active {
      color: rgba(255, 255, 255, 0.9);
    }
    @media (hover: hover) {
      &:hover {
        filter: drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.9));
      }
    }
    @media (max-width: 480px), (max-height: 480px) {
      width: 15vmin;
      height: 15vmin;
    }
  }
`;

const initialSettings: Settings = {
  colors: assignIdsToArrayItems([
    '#4CAF50',
    '#5E35B1',
    '#536DFE',
    '#03A9F4',
    '#CDDC39',
    '#FFC107',
    '#FF5722'
  ]),
  rows: 7,
  patternIndex: 0
};

const App: React.FC = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handlePauseClick = () => {
    setIsPlaying(false);
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const onSettingChange = (newSettings: Partial<Settings>) => {
    setSettings({...settings, ...newSettings});
  };

  return (
    <Container>
      <MenuContainer>
        {isPlaying ? (
          <FiPause onClick={handlePauseClick} />
        ) : (
          <FiPlay onClick={handlePlayClick} />
        )}

        <FiSettings
          onClick={handleSettingsClick}
          data-testid="open-settings-btn"
        />
      </MenuContainer>

      <ChristmastLights isPlaying={isPlaying} settings={settings} />
      <SettingsView
        settings={settings}
        onChange={onSettingChange}
        isOpen={isSettingsOpen}
        close={closeSettings}
      />
    </Container>
  );
};

export default App;

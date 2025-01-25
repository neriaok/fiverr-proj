import { levelIcons } from '../cmps/LevelIcons';


export const levelService = {
    setIcon,
}

function setIcon(level) {
    switch (level) {
      case 'Top Rated':
        return levelIcons.topRateSign;
      case 'Level 2':
        return levelIcons.level2Sign;
      default:
        return levelIcons.level1Sign;
    }
  };

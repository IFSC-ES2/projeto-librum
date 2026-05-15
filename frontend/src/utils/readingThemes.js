export const themes = {
  padrao: {
    id: 'padrao',
    label: 'Padrão',
    contentBackground: '#FAF8F5',
    contentColor: '#333333',
    fontFamily: 'Georgia, serif',
    dropCapColor: '#F97316',
    sidebarBg: '#FFFFFF',
    controlsBg: '#FFFFFF'
  },
  noturno: {
    id: 'noturno',
    label: 'Noturno',
    contentBackground: '#1E1E2E',
    contentColor: '#CDCDD6',
    fontFamily: 'Georgia, serif',
    dropCapColor: '#FBAF7B',
    sidebarBg: '#2A2A3C',
    controlsBg: '#2A2A3C'
  },
  ampliado: {
    id: 'ampliado',
    label: 'Ampliado',
    contentBackground: '#FAF8F5',
    contentColor: '#000000',
    fontFamily: 'Georgia, serif',
    dropCapColor: '#D9530F',
    sidebarBg: '#FFFFFF',
    controlsBg: '#FFFFFF'
  }
};

export const applyTheme = (themeId, fontSize, lineSpacing) => {
  const theme = themes[themeId] || themes.padrao;

  const root = document.documentElement;
  root.style.setProperty('--reading-bg', theme.contentBackground);
  root.style.setProperty('--reading-text', theme.contentColor);
  root.style.setProperty('--reading-dropcap', theme.dropCapColor);
  root.style.setProperty('--reading-sidebar-bg', theme.sidebarBg);
  root.style.setProperty('--reading-controls-bg', theme.controlsBg);

  return {
    backgroundColor: theme.contentBackground,
    color: theme.contentColor,
    fontFamily: theme.fontFamily,
    fontSize: `${fontSize}px`,
    lineHeight: lineSpacing,
  };
};

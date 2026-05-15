export const themes = {
  padrao: {
    id: 'padrao',
    name: 'Padrão',
    backgroundColor: '#FAF8F5',
    color: '#333333',
    dropCapColor: '#F97316',
    sidebarBg: '#FFFFFF',
    controlsBg: '#FFFFFF'
  },
  noturno: {
    id: 'noturno',
    name: 'Noturno',
    backgroundColor: '#1E1E2E',
    color: '#CDCDD6',
    dropCapColor: '#FBAF7B',
    sidebarBg: '#2A2A3C',
    controlsBg: '#2A2A3C'
  },
  ampliado: {
    id: 'ampliado',
    name: 'Ampliado',
    backgroundColor: '#FAF8F5',
    color: '#000000',
    dropCapColor: '#D9530F',
    sidebarBg: '#FFFFFF',
    controlsBg: '#FFFFFF'
  }
};

export const applyTheme = (themeId) => {
  const theme = themes[themeId] || themes.padrao;

  const root = document.documentElement;
  root.style.setProperty('--reading-bg', theme.backgroundColor);
  root.style.setProperty('--reading-text', theme.color);
  root.style.setProperty('--reading-dropcap', theme.dropCapColor);
  root.style.setProperty('--reading-sidebar-bg', theme.sidebarBg);
  root.style.setProperty('--reading-controls-bg', theme.controlsBg);

  return theme;
};

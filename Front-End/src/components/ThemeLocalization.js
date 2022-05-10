// @mui
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

ThemeLocalization.propTypes = {
  children: PropTypes.node,
};

export default function ThemeLocalization({ children }) {
  const defaultTheme = useTheme();
  // const { currentLang } = useLocales();

  const theme = createTheme(defaultTheme, 'enUS');

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

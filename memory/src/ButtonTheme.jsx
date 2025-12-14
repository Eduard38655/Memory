import Styles from "../src/App.module.css";
import { useTheme } from "./ThemeContext.jsx";

function ButtonsTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={Styles.Button_Change_theme}>
      {theme === "dark" ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
    </button>
  );
}

export default ButtonsTheme;

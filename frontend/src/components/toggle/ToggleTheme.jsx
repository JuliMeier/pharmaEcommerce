import { useContext } from "react"
import { Button } from "react-bootstrap"

import { ThemeContext } from "../../context/theme/ThemeContext"
import { THEMES } from "../../context/theme/ThemeContextProvider"

const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button onClick={toggleTheme} className="me-3 my-3">
            {theme === THEMES.LIGHT ? "🌙 Modo oscuro" : "☀️ Modo claro"}
        </Button>
    )
}

export default ToggleTheme
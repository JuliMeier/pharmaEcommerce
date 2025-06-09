import { useContext } from "react"
import { Button } from "react-bootstrap"

import { ThemeContext } from "../../context/theme/ThemeContext"
import { THEMES } from "../../context/theme/ThemeContextProvider"

const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button
            onClick={toggleTheme} className="me-3 my-3" variant={theme === THEMES.LIGHT ? "outline-dark" : "outline-light"}>
            {theme === THEMES.LIGHT ? "🌙" : "☀️"}
        </Button>

    )
}

export default ToggleTheme
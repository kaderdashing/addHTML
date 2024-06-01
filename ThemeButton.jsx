import { useState, useInsertionEffect } from "react";

export const ThemeButton = () => {
  const [theme, setTheme] = useState("dark");

  useInsertionEffect(() => {
    const { color, bgColor } = getsColorsFor(theme);
    let styleRule = null;
    let themeMessageDiv = null;

    if (color !== buttonColor || bgColor !== buttonBgColor) {
      buttonColor = color;
      buttonBgColor = bgColor;
      styleRule = getStyleRule();
      document.head.appendChild(styleRule);
    }
// ici on r'ajoute une div HTML 
    themeMessageDiv = document.createElement("div");
    themeMessageDiv.className = "theme-message";
    themeMessageDiv.innerText = `The current theme is ${theme}`;
    document.body.appendChild(themeMessageDiv);

    return () => {
      if (styleRule) {
        document.head.removeChild(styleRule);
      }
      // ici on le remove car on a plus besoin de lui 
      if (themeMessageDiv) {
        document.body.removeChild(themeMessageDiv);
      }
    };
  }, [theme]);

  const onThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={onThemeChange} className="theme-button">
      Change my theme
    </button>
  );
};

let buttonColor = "";
let buttonBgColor = "";

const getStyleRule = () => {
  const styleElement = document.createElement("style");
  const rule = `
    .theme-button {
      color: ${buttonColor};
      background-color: ${buttonBgColor};
      padding: 1rem;
      border: 1px solid black;
      border-radius: 0.25rem;
      cursor: pointer;
      margin: auto;
    }
    .theme-message {
      margin-top: 1rem;
      font-size: 1.25rem;
      color: ${buttonColor};
    }
  `;
  styleElement.innerHTML = rule;
  return styleElement;
};

const getsColorsFor = (theme) => {
  if (theme === "light") {
    return { color: "black", bgColor: "white" };
  }
  return { color: "white", bgColor: "black" };
};

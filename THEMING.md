# Theming BrowserTerminal
To theme BrowserTerminal you first have to create a config file at `~/.config/browserterminal.json`.
The config file uses the JSON format, so I assume you understand how JSON works.
Create a key in the config file called `theme`
theme is an xtermjs ITheme object. See more about the format [here](https://xtermjs.org/docs/api/terminal/interfaces/itheme/)
Here's a sample config file
```json
{
    "theme": {
        "background": "#262220",
        "red": "#af5f5f",
        "green": "#87875f",
        "yellow": "#bcbc6c",
        "blue": "#665c7f",
        "magenta": "#cd7998",
        "cyan": "#6d978a",
        "white": "#bbbbbb",
        "brightBlack": "#8f9494",
        "brightRed": "#bb6868",
        "brightGreen": "#849155",
        "brightYellow": "#c5c563",
        "brightBlue": "#87afaf",
        "brightMagenta": "#c987a0",
        "brightCyan": "#7ca296",
        "brightWhite": "#ddd0c0",
        "cursor": "#ddd0c0",
        "foreground": "#ddd0c0",
        "selection": "#8f9494"
    }
}
```
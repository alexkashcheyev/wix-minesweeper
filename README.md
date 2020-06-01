# Demo

https://alexkashcheyev.github.io/wix-minesweeper/

# To start the game

1. Click on the hamburger button.
1. Set desired field width, height and mines amount.
1. If you want to cheat, set the superman checkbox. This checkbox can be toggled during the game as well.
1. Click "Start"

# Navigation

1. For performance and looks, player will only see a limited amount of cells at once.
1. It can be set in `appconfig.js` by changing `viewportWidth` and `viewportHeight` values.
1. You can move around it using either buttons on the page, arrow buttons on the keyboard, or WASD buttons.
1. You can see viewport position on the minimap below the flag count, but it is shown only if the field doesn't fit.
1. Also you can see field edges as borders around the viewport

# Unit tests

To run unit tests, run `npm run test`.
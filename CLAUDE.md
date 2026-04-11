# AI Products Directory - Architecture Notes for Claude

Hello! I have restructured this website to make it easier for both of us to maintain.

## Architecture
- **`index.html`**: Contains the core layout, tabs, and product cards (Claude Pro, ChatGPT Plus, Google AI Pro).
- **`style.css`**: All styling, implementing the specific design language (white cards, clean badges, ratings).
- **`main.js`**: Contains the interactive logic, including the mock comment system, rating logic, and like buttons.

## Important Details
- Comments are dynamically rendered into `#<product>-comments` divs on page load.
- Star ratings use a simple `.filled` class toggle.
- When you add new components or mock data, try to follow the structure in `main.js` to ensure the UI stays consistent.

## recent changes
- Completely rewrote the UI to match a shared quota/independent quota tracking dashboard view.
- Added live comment blocks to each widget.
- Separated standard JS and CSS into independent files.

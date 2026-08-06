# BoredDotCom

BoredDotCom is a minimalist, modern, and interactive drawing canvas designed to help you sketch your boredom away. Built with HTML5 Canvas, modern JavaScript, and Tailwind CSS, it offers a seamless and engaging drawing experience across all devices.

## Modern UI/UX Highlights
- **Glassmorphic Toolbar**: A sleek, floating control panel that maximizes canvas space while keeping essential tools readily available.
- **Dynamic Theming**: First-class support for both Light and Dark modes. The interface and background seamlessly transition to match your preference.
- **Fluid & Accessible**: Utilizes crisp typography (Google Inter) and Bootstrap Icons for clear, readable, and intuitive controls.
- **Micro-Interactions**: Subtle hover effects and transition animations enhance the feeling of a premium application.

## Responsive Design Details
- **Mobile-First Touch Support**: Optimized for touch events (phones and tablets) ensuring smooth drawing without accidental scrolling or zooming.
- **Adaptive Canvas**: The canvas dynamically resizes to fill your browser window, retaining your artwork beautifully if you change your window size.
- **Floating Controls**: On mobile and desktop, the toolbar remains fixed and centered at the bottom, offering an un-obstructive view of your masterpiece while being easy to reach.

## New Features Guide
1. **Customizable Brush Engine**
   - **Color Picker**: Choose any color seamlessly using the native color picker, or quickly swap between standard swatches (Black, Red, Blue, Green, White).
   - **Brush Size Slider**: Instantly adjust your stroke width from fine details to thick marker lines.
2. **Undo & Redo System**
   - Made a mistake? No problem. The advanced history stack tracks your strokes so you can effortlessly undo or redo actions.
3. **Dark / Light Mode Toggle**
   - Switch between a bright canvas (Light Mode) or an eye-strain-friendly dark background (Dark Mode) with a single click.

## Tech Stack
- **HTML5**: Semantic structure and `<canvas>` API for rendering.
- **JavaScript (Vanilla)**: Handles drawing logic, state management (history stack), resizing, and touch/mouse events without relying on heavy frameworks.
- **Tailwind CSS**: Utility-first CSS framework (via CDN) for rapid UI styling, glassmorphism, and responsive layout.
- **Bootstrap Icons**: Lightweight icon pack for clear visual cues.
- **Google Fonts (Inter)**: Clean and modern typography.

## Installation / Setup Instructions
Because BoredDotCom is a pure static frontend application, no build steps or package managers are required!

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/bored.git
   cd bored
   ```
2. **Open the App**:
   Simply open `index.html` in your favorite web browser (Chrome, Firefox, Safari, Edge, etc.).


## Usage
- **Draw**: Click/Touch and drag on the background to start drawing.
- **Change Color**: Click the color picker on the left side of the toolbar or select a quick swatch.
- **Change Brush Size**: Drag the slider next to the brush icon.
- **Undo / Redo**: Use the counter-clockwise and clockwise arrow buttons to traverse your drawing history.
- **Clear**: Hit the red trash can icon to wipe the canvas clean.
- **Toggle Theme**: Click the Sun/Moon icon on the right side of the toolbar to switch themes.

# Viora

A modern, accessible React component library built with JavaScript, JSX, Vite, and CSS Variables.

Viora is under active development. Components are added milestone by milestone and only documented here once they exist.

## Requirements

- Node.js 20+
- React 18 or 19 (installed by your app, not by Viora)

## Installation

Not yet published to npm. Until then, Viora is developed inside this repository.

```bash
npm install
```

## Scripts

```bash
npm run dev             # start Storybook
npm run test            # run tests once
npm run test:watch      # run tests in watch mode
npm run lint            # run ESLint
npm run build           # build the library into dist/
npm run build-storybook # build static Storybook
```

## Project structure

```text
src/
├── components/   # components (added per milestone)
├── hooks/        # reusable React hooks
├── utils/        # shared helpers
├── stories/      # documentation stories
├── styles/       # tokens.css + index.css
└── index.js      # public package entry
```

## Theming

All design tokens are CSS variables prefixed with `--viora-`, defined in `src/styles/tokens.css`. They can be overridden by consumers.

## License

MIT

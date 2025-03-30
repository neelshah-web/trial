# SQL Query Viewer

A web-based SQL query viewer built with React that allows users to write, execute, and visualize SQL queries with mock data.

## Features

- Interactive SQL query editor with syntax highlighting
- Predefined query examples
- Mock data execution
- Responsive table display for query results
- Clean and modern UI

## Technical Stack

- React 18
- TypeScript
- Styled Components for styling
- CodeMirror for SQL editing
- Vite for build tooling

## Performance Optimizations

- Virtual DOM rendering for large datasets
- Efficient table rendering
- Debounced query execution
- Memoized components where beneficial

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
  ├── components/        # React components
  ├── data/             # Mock data and queries
  ├── utils/            # Utility functions
  ├── App.tsx           # Main application component
  └── main.tsx         # Application entry point
```

## Load Times

The application is optimized for fast load times:
- Initial bundle size is kept minimal
- Code splitting for larger dependencies
- Efficient styling with styled-components
- Optimized asset loading

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
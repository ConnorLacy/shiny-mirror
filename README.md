# Notes
  Will be using this readme to describe the purpose of each of the components
  of this SSR React application
***
# Directory
## bin
- 
## dist
## src
- ### App
    App contains the React Application code. This will be compiled via webpack and rendered to the DOM
    as a string, and then the React/JS will be attached afterwords
- ### Client
    What would normally be the standard index.js entry for a react application, we have our client entry.
    This entry point uses the <code>hydrate</code> function from React to hydrate the DOM with the react
    logic after the static content is written to the DOM as a string from the server
- ### Server
    The entrypoint of the server exports the middleware and accepts a hot reload ( ? )
    ##### Middleware
    The middleware contains the primary logic for compiling the React application into a String and serving
    it to the DOM. This String will be hydrated with React logic later
## Webpack
***
# Dependencies
- Express 
  Creating a server with express
- React
  Necessary for React Application
- React-DOM
  Necessary for React Application
***
# Dev Dependencies
- Types
  - @types/express
  - @types/react
  - @types/react-dom
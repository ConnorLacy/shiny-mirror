/*
    This is the entry point for the client. Typically this is 'index.js' in a 
    standard react application. This will hydrate the DOM with the React logic.
    When this hydrate function is called, the static content will already be in
    the DOM because of the server-side rendering
*/

import React from 'react'
import { hydrate } from 'react-dom'

import { App } from '../app/app'

hydrate(<App />, document.getElementById('react-root'))

# Troubleshooting

## `throw er; // Unhandled 'error' event`

You likely forgot to run `npm install` (which also calls `bower install`) after
you Git pulled.

## `npm ERR! cb() never called!`

Ensure your `npm` version is >= 2.x. The upstream-recommended way to update
`npm` is `npm install -g npm@latest`.

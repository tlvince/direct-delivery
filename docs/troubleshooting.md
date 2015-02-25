# Troubleshooting

## `throw er; // Unhandled 'error' event` when running Gulp

You likely forgot to run `npm install` (which also calls `bower install`) after
you Git pulled.

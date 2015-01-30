setlocal wildignore+=dist,coverage
setlocal foldlevelstart=2
let $PATH = './node_modules/.bin:' . $PATH
let g:syntastic_javascript_checkers = ['eslint']
let g:used_javascript_libs = 'angularjs,angularui'
let g:syntastic_html_tidy_ignore_errors = [
  \ ' proprietary attribute "ng-',
  \ ' proprietary attribute "ui-',
  \ 'trimming empty <span>',
  \ 'trimming empty <i>',
  \ '<form> proprietary attribute "novalidate"',
  \ '<form> lacks "action" attribute',
  \ '<input> proprietary attribute "required"',
  \ '<input> proprietary attribute "details"',
  \ '<input> proprietary attribute "max"',
  \ '<input> proprietary attribute "min"',
  \ '<input> proprietary attribute "step"',
  \ '<select> proprietary attribute "required"',
  \ 'proprietary attribute "popover"',
  \ 'proprietary attribute "popover-trigger"',
  \ 'unescaped & which should be written as &amp;',
  \ '<tab> is not recognized!',
  \ 'discarding unexpected <tab>',
  \ 'discarding unexpected </tab>',
  \ '<tabs> is not recognized!',
  \ 'discarding unexpected <tabs>',
  \ 'discarding unexpected </tabs>',
  \ '<tabset> is not recognized!',
  \ 'discarding unexpected <tabset>',
  \ 'discarding unexpected </tabset>',
  \ '<tab-heading> is not recognized!',
  \ 'discarding unexpected <tab-heading>',
  \ 'discarding unexpected </tab-heading>'
  \ ]

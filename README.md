# react_blp

A new React project.

## Getting Started

This project is a starting point for a react application.


```
npm install
npm run ios/android
```



error :
Command PhaseScriptExecution failed with a nonzero exit code

解决：
open react_blp/node_modules/react-native/scripts/find-node.sh

查找
```
 Source nvm with '--no-use' and then `nvm use` to respect .nvmrc
 See: https://github.com/nvm-sh/nvm/issues/2053
if [[ -s "$HOME/.nvm/nvm.sh" ]]; then
  # shellcheck source=/dev/null
  . "$HOME/.nvm/nvm.sh" --no-use
  nvm use 2> /dev/null || nvm use default
elif [[ -x "$(command -v brew)" && -s "$(brew --prefix nvm)/nvm.sh" ]]; then
  # shellcheck source=/dev/null
  . "$(brew --prefix nvm)/nvm.sh" --no-use
  nvm use 2> /dev/null || nvm use default
fi
```
注释

'
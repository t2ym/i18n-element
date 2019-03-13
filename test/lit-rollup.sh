#!/bin/sh

rm -rf lit-bundled
cp -rvf preprocess4 lit-bundled

for i in minimal basic edge-case multiple-case template-default-lang preference no-persist; do {
  echo Building lit-bundled $i;
  sed -e "s/test-name/${i}/g" esm-bundled.rollup.config.js >rollup.config.js
  ../node_modules/.bin/rollup -c rollup.config.js
} done

rm -vf rollup.config.js

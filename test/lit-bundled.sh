#!/bin/sh

rm -rf lit-bundled lit-src4-bundled
cp -rvf preprocess4 lit-bundled
cp -rvf src4 lit-src4-bundled

for i in minimal basic; do {
  echo Building lit-bundled $i;
  sed -e "s/test-name/${i}/g" lit-polymer.json >polymer.json
  polymer build --root=..
  cp -vf build/esm-bundled/lit-bundled/${i}-test-imports.js lit-bundled/${i}-test-imports.js
  sed -e "s/test-name/${i}/g" lit-src4-polymer.json >polymer.json
  polymer build --root=..
  cp -vf build/esm-bundled/lit-src4-bundled/${i}-test-imports.js lit-src4-bundled/${i}-test-imports.js
} done

rm -vf polymer.json
rm -rvf build

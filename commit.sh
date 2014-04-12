#!/bin/sh

FOO=`grep VERSION player.js | sed -e 's/.*XXX\([0-9]\+\)YYY",/\1/'`
FOO=$(($FOO+1))
echo V $FOO


sed -i "s/XXX[0-9]\+YYY/XXX${FOO}YYY/" player.js | grep VERSION

git stage *.*
git commit -m "$FOO"
git push


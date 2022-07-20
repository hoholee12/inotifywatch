#!/bin/bash

syncdir=/home/test/syncfolder

for i in $(seq 1 100); do
  dd if=/dev/urandom of=$syncdir/test$i.jpeg bs=128K count=8 2>/dev/null
  #sleep 0.1
  #if [[ $(($i%10)) == 9 ]]; then
  #  sleep 2
  #fi
done

while [[ $(./access.sh | grep '1.0M' | wc -l) -lt 100 ]]; do
  continue
done

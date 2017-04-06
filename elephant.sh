#!/bin/bash
build() {
	echo "Building App"
	echo "============"
	ionic build ios
	echo "Optimising App"
	cp -r platforms/ios\
	Archive/
	mv Archive/ios\
	Archive/elephant'_'`date +%s`
	echo "============"
	echo "Build is successfully created. \
	Find it here, Archive/elephant_`date +%s`"
}

run() {
	echo "Running App..."
	ionic run ios
}

$1 $2
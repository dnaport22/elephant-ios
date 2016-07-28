Frontend Base Directory
=======================

This project contains a set of recommended partials and folder structure for starting a project from. Some of this is Drupal influenced, but can be used outside of Drupal.

Each folder contains a README file explaining the reasoning behind it's existence.

There is minimal CSS in place, as the idea is to be an minimal as possible while still conveying the importance of a clean and well understood folder structure.

This project makes no assumption about your naming conventions, task runner workflow or anything other than the folder structure of your project.

The READMEs should be modified and updated to reflect your project's CSS approach should you chose to use this.

## Barebones Sass Structure
The authoring architecture uses many of the ideas
discussed in Jonathan [Snook's SMACSS](http://smacss.com) and is intended to
provide a starting point for building modular, scalable CSS using Sass and
Drupal.

Multiple Sass partials are used to help organise the styles, these are combined
by including them in styles.scss which is compiled into styles.css in the css/
directory.

All styles are included in order of specificity, this means that as you go down
the document each section builds upon and inherits sensibly from the previous
ones. This results in less undoing of styles, less specificity problems and
all-round better architected and lighter stylesheets.

The file and directory structure contained in this folder looks something like
this:

### Top level files
These files are the main entry points for the Sass compiler and shouldn't
directly contain any CSS code, instead they only serves to combine the Sass
contained in the partials (see below) through @import directives.

#### style.scss
This file aggregates all the components into a single file.

### Partials

#### utilities
Collection of variables and any generic mixins or functions.

#### base
This is where you place all your basic, raw HTML element styling.

#### layouts
This is where you place your major layout styling.

#### components
This is where you place your abstracted component styling.

#### pages
This is where you place any styling overriding a particular page.
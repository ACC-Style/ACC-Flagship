Welcome ACC Flagshp Styles
-------------------
This is the upgraded and modular styling of the ACC flagship website.

## Concept
This design was build to be modular and compartmentalized.

1. __base__ - any file that deals with varables, fonts and basic typography (raw tags).
2. __helpers__ or 'required.scss ' - Mostly mixens but some files that have "required" in the name are needed for other files to functions. any file that have been named with "trump" will
3. __components__ - any combination of DOM elements that make up a widget, nav, or collection of tags.
4. __vendor__ - Any included style from a javascript or framework that needs an override to be inline with ACC standards.
5. __structure__ - Non-Styling Pure Page Layout Code.  Balanced Columns, Sidebars, Page Spacing etc...
6. __views__ - Overrides of components when in specific cases of the page or theme they are in. Like Sidebar Box on the Home page would be "_home.sidebarbox.scss"
7. __trumps__ or '.trump.scss' - utility classes that have either high specificty or should override other uses of the same style in earlier stylesheets.  

As you travel down the structure of the main document the included stylesheets should increase there specificty. 



#### Products that Use the Design
http://acc.org/

#### Style Guide w/ HTML Examples
http://acc-style.github.io/ACCBase/htmlsource/styleguide/

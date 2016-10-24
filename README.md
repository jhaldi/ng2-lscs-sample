## Simple Angular2 project template

This is a simple canned empty project I created to simplify my own work when starting a new Angular2 project.

Typescript assumption:  I work with WebStorm and have TypeScript 2.0.3 installed globally, so it is not included in this package.json file.
If you need TypeScript you should get it by either installing it to your package
```sh
npm install --save typescript
```
or install it globally
```sh
npm install -g typescript 
```


Essentially this is a stripped down, slightly modified version of the package found on the [Angular2 Quickstart tutorial](https://angular.io/docs/ts/latest/quickstart.html).

Some of the modifications to Quickstart include the following:
- Use of the new @types for both the core-js and node package items
- Elimination of the live-server package items since I prefer the XAMPP local server I use
- Elimination of the testing pieces - for now I wanted a bare bones NG2 install package for my own sandbox purposes

## Installation
####1. Clone this project or download it as a zip file

```sh
$ git clone https://github.com/jhaldi/quick-ng2-template.git
```

####2. Install the local packages
 
```sh
$ npm install
```


[![NPM version](https://img.shields.io/npm/v/react-codegen-cli?style=flat-square&color=1e88e5)](https://www.npmjs.com/package/react-codegen-cli)
[![GitHub stars](https://img.shields.io/github/stars/Cristians953/react-codegen-cli?style=flat-square&color=yellow)](https://github.com/Cristians953/react-codegen-cli)
[![NPM total downloads](https://img.shields.io/npm/dt/react-codegen-cli.svg?style=flat-square)](https://npmcharts.com/compare/react-codegen-cli?minimal=true)
[![NPM monthly downloads](https://img.shields.io/npm/dm/react-codegen-cli.svg?style=flat-square&color=03a9f4)](https://npmcharts.com/compare/react-codegen-cli?minimal=true)
[![NPM license](https://img.shields.io/npm/l/react-codegen-cli?style=flat-square)](https://www.npmjs.com/package/react-codegen-cli)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square&color=66bb6a)](https://github.com/Cristians953/react-codegen-cli/issues)


<br />
<p align="center">
  <a href="https://github.com/Cristians953/react-codegen-cli">
    <img height="128" src="https://user-images.githubusercontent.com/22912150/89680591-e9418e80-d8fb-11ea-93f7-1631ea571f33.png" alt="logo" />
  </a>

  <h1 align="center">React CodeGen CLI</h1>

  <p align="center">
    React CodeGen is a development tool to quickly generate React components.  
    It helps you to speed up productivity in React projects and stop copying, pasting files.
    <br />
    <br />
    <a href="#get-started">Get Started</a>
    ·
    <a href="https://github.com/Cristians953/react-codegen-cli/issues">Report Bug</a>
    ·
    <a href="https://github.com/Cristians953/react-codegen-cli/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

* [Installation](#installation)
* [Get Started](#get-started)
* [Configuration File](#configuration-file)
* [Configuration Options](#configuration-options)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)

## Installation

To install the latest version run the following command:

```sh
npm i react-codegen-cli --save-dev
```

React CodeGen lets you setup everything by simply running the following command:

```sh
npx react-codegen-cli init
```

Question by question, it will guide you through the whole process of setting up a configuration file,
selecting stylesheet format, picking a destination of generated files, and a lot more.

## Get Started

The following command can be used to generate code:
```sh
npm run react-codegen
```

After running the command in the terminal,
you can enter the name of the component and configure the generation of the files.
When creating a React component, you are given the choice to modify the component parts,
such as connecting the `useState`, `useEffect`, `propTypes` and so on.

![Demo](https://i.imgur.com/TFykAL4.png)
![Demo2](https://i.imgur.com/uEMSlCz.png)

## Configuration File

You also can set-up configuration file manually. 
React CodeGen uses  [cosmiconfig](https://github.com/davidtheclark/cosmiconfig)  for configuration file support. This means you can configure it via:

-   A  `"react-codegen"`  key in your  `package.json`  file.
-   A  `.react-codegenrc`  file, written in JSON or YAML, with optional extensions:  `.json/.yaml/.yml`  (without extension takes precedence).
-   A  `.react-codegenrc.js`  or  `react-codegen.config.js`  file that exports an object.

`react-codegen` will look for a [configuration file](#configuration-file) in root folder and use it if available.
If no config file found it will fallback to a default configuration.

## Configuration Options

|     Type     |                             Value                            |     Default    |                              Description                             |
|:------------:|:------------------------------------------------------------:|:--------------:|----------------------------------------------------------------------|
| styles       |                            string                            |      scss      | Stylesheet format                                                    |
| typescript   |                            boolean                           |      false     | Generate typescript files                                            |
| jsxExt       |                            boolean                           |      true      | Use `jsx` extension for components                                   |
| fileNameCase | came,<br/> pascal,<br/>   snake,<br/> snakeUpper,<br/> kebab |     pascal     | File name case for generated files<br/> (default: `MyComponent.jsx`) |
| path         |                            string                            | src/components | Path to generate files
| wrapFolder   | boolean | true | Create a wrap folder for generated files |
| cssModules   | boolean | false | Generate css module |
| exportType   | default,<br /> named | default | Export type to be used for modules
| arrowFunction | boolean | true | Use arrow functions insead of regular

Example:

```json
{
  "styles": "scss",
  "typescript": false,
  "jsxExt": true,
  "fileNameCase": "pascal",
  "path": "src/components"
}
```

## Roadmap

See the [open issues](https://github.com/Cristians953/react-codegen-cli/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

React CodeGen CLI is open source software [licensed as MIT](https://github.com/cristians953/react-codegen/blob/master/LICENSE).

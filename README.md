# React Codegen CLI

React Codegen is a development tool to quickly generate React components.  
It helps you to speed up productivity in React projects and stop copying, pasting files.

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
React codegen uses  [cosmiconfig](https://github.com/davidtheclark/cosmiconfig)  for configuration file support. This means you can configure it via:

-   A  `"react-codegen"`  key in your  `package.json`  file.
-   A  `.react-codegenrc`  file, written in JSON or YAML, with optional extensions:  `.json/.yaml/.yml`  (without extension takes precedence).
-   A  `.react-codegenrc.js`  or  `react-codegen.config.js`  file that exports an object.

The configuration file will be resolved in the root folder of the project. If no configuration file found the default config will be used.

`react-codegen` will look for a [configuration file](#configuration-file) in root folder and use it if available.
If no config file found it will fallback to a default configuration.

### Configuration Options

|     Type     |                             Value                            |     Default    |                              Description                             |
|:------------:|:------------------------------------------------------------:|:--------------:|----------------------------------------------------------------------|
| styles       |                            string                            |      scss      | Stylesheet format                                                    |
| typescript   |                            boolean                           |      false     | Generate typescript files                                            |
| jsxExt       |                            boolean                           |      true      | Use `jsx` extension for components                                   |
| fileNameCase | came,<br/> pascal,<br/>   snake,<br/> snakeUpper,<br/> kebab |     pascal     | File name case for generated files<br/> (default: `MyComponent.jsx`) |
| path         |                            string                            | src/components | Path to generate files                                               |                                           |                                           |

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

## License

React CodeGen CLI is open source software [licensed as MIT](https://github.com/cristians953/react-codegen/blob/master/LICENSE).

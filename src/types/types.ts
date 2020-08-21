export type StyleFormats = 'CSS' | 'SCSS' | 'SASS' | 'Less' | 'Stylus';
export type FileNameCase = 'pascal' | 'camel' | 'kebab' | 'snake' | 'snakeUpper';
export type ExportType = 'named' | 'default';

export interface IConfig {
  styles: StyleFormats;
  typescript: boolean;
  jsxExt: boolean;
  fileNameCase: FileNameCase;
  path: string;
  wrapFolder: boolean;
  cssModules: boolean;
  exportType: ExportType;
}

interface IBaseVariables {
  componentName: string;
  fileName: string;
}

export interface IComponentVariables extends IBaseVariables {
  type: 'component' | 'hoc';
  name: string;
  test: boolean;
  hooks: string[];
  mods: string[];
}

export interface IHOCVariables extends IBaseVariables {
  type: 'hoc';
  name: string;
  hooks: string[];
}

export interface IHookVariables extends IBaseVariables {
  type: 'hook';
  name: string;
  hooks: string[];
}

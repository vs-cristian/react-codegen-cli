import { reactHooks } from '@/questions/questionTypes';

export type StyleFormats = 'css' | 'scss' | 'sass' | 'less' | 'stylus';
export type FileNameCase =
  | 'pascal'
  | 'camel'
  | 'kebab'
  | 'snake'
  | 'snakeUpper';
export type ExportType = 'named' | 'default';
export type ReactHook = typeof reactHooks[number];
export type ReactHooks = ReactHook[];

export interface IConfig {
  styles?: StyleFormats;
  typescript?: boolean;
  newJsx?: boolean;
  jsxExt?: boolean;
  fileNameCase?: FileNameCase;
  path: string;
  wrapFolder?: boolean;
  cssModules?: boolean;
  exportType?: ExportType;
  arrowFunction?: boolean;
}

interface IBaseVariables {
  componentName: string;
  fileName: string;
}

export type Variables = IHookVariables | IHOCVariables | IComponentVariables;

export interface IComponentVariables extends IBaseVariables {
  type: 'component';
  name: string;
  test: boolean;
  hooks: ReactHooks;
  mods: string[];
}

export interface IHOCVariables extends IBaseVariables {
  type: 'hoc';
  name: string;
  hooks: ReactHooks;
}

export interface IHookVariables extends IBaseVariables {
  type: 'hook';
  name: string;
  hooks: ReactHooks;
}

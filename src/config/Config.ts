import { FileNameCase, IConfig, StyleFormats } from '@/types';
import defaultConfig from './default.json';

export type ConfigPrefixes = {
  style: 'module' | 'styles';
  test: 'test';
};

export type ConfigExt = {
  component: string;
  script: string;
  style: string;
};

export class Config implements IConfig {
  config: IConfig;

  fileNameCase: FileNameCase;

  styles: StyleFormats;

  path: string;

  jsxExt: boolean;

  typescript: boolean;

  wrapFolder: boolean;

  cssModules: boolean;

  prefixes: ConfigPrefixes;

  ext: ConfigExt;

  constructor(config: IConfig) {
    this.config = Object.assign(defaultConfig, config);

    this.setInitialVariables();
    this.setFilesExtension();
    this.setPrefixes();
  }

  private setInitialVariables() {
    this.fileNameCase = this.config.fileNameCase;
    this.styles = this.config.styles;
    this.path = this.config.path;
    this.jsxExt = this.config.jsxExt;
    this.typescript = this.config.typescript;
    this.wrapFolder = this.config.wrapFolder;
    this.cssModules = this.config.cssModules;
  }

  private setFilesExtension() {
    let styleExt = this.styles.toLowerCase();
    if (styleExt === 'stylus') {
      styleExt = 'styl';
    }

    this.ext = {
      component: this.typescript ? 'tsx' : `j${this.jsxExt ? 'sx' : 's'}`,
      script: `${this.typescript ? 't' : 'j'}s`,
      style: styleExt,
    };
  }

  private setPrefixes() {
    this.prefixes = {
      style: this.cssModules ? 'module' : 'styles',
      test: 'test',
    };
  }
}

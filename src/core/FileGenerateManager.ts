import { config } from '@/config';
import { IComponentVariables, IHOCVariables, IHookVariables } from '@/types';
import { BarrelTemplate } from '@/core/temlpates/components/BarrelTemplate';
import * as utils from '../utils';
import { FileService } from './FileService';
import { TemplateGenerator } from './TemplateGenerator';
import { HOCTemplate } from './temlpates/components/HOCTemplate';
import { ComponentTemplate } from './temlpates/components/ComponentTemplate';
import { ComponentTestTemplate } from './temlpates/components/ComponentTestTemplate';
import { HookTemplate } from './temlpates/components/HookTemplate';

export class FileGenerateManager {
  static generateHook(answers: IHookVariables) {
    const variables = utils.getHookVariables(answers);

    const fileService = new FileService(variables.fileName);
    const templateGenerator = new TemplateGenerator(variables);

    fileService.createDir();

    const jsTemplate = templateGenerator.generateTemplate(HookTemplate);
    fileService.genJs(jsTemplate);
  }

  static generateHOC(answers: IHOCVariables) {
    const variables = utils.getHOCVariables(answers);

    const fileService = new FileService(variables.fileName);
    const templateGenerator = new TemplateGenerator(variables);

    fileService.createDir();

    const jsTemplate = templateGenerator.generateTemplate(HOCTemplate);
    fileService.genJs(jsTemplate);
  }

  static generateComponent(answers: IComponentVariables) {
    const variables = utils.getComponentVariables(answers);

    const fileService = new FileService(variables.fileName);
    const templateGenerator = new TemplateGenerator(variables);

    fileService.createDir();

    const jsTemplate = templateGenerator.generateTemplate(ComponentTemplate);
    fileService.genJs(jsTemplate);

    if (variables.test) {
      const testTemplate = templateGenerator.generateTemplate(
        ComponentTestTemplate
      );
      fileService.genTest(testTemplate);
    }

    if (variables.barrel) {
      const barrelTemplate = templateGenerator.generateTemplate(BarrelTemplate);
      fileService.genBarrel(barrelTemplate);
    }

    const styleTemplate = config.cssModules ? '.root {}' : '';
    fileService.genStyle(styleTemplate);
  }
}

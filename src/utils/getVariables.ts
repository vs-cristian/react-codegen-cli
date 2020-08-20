import { config } from '@/config';
import { IComponentVariables, IHOCVariables, IHookVariables } from '@/types';
import { changeCase } from './changeCase';

export function getHOCVariables(data): IHOCVariables {
  let name: string = data.name.toLowerCase();
  name = `with_${name}`;
  name = changeCase(name, 'camel');

  return Object.assign(data, {
    componentName: name,
    fileName: name,
  });
}

export function getHookVariables(data): IHookVariables {
  let name: string = data.name.toLowerCase();
  name = `use_${name}`;
  name = changeCase(name, 'camel');

  return Object.assign(data, {
    componentName: name,
    fileName: name,
  });
}

export function getComponentVariables(data): IComponentVariables {
  return Object.assign(data, {
    componentName: changeCase(data.name, 'pascal'),
    fileName: changeCase(data.name, config.fileNameCase),
  });
}

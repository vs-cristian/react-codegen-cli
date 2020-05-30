import { EXT } from '../constants';
import { getNameCases } from './getNameCases';
import { getFileName } from './getFileName';

export function getVariables(data) {
  return Object.assign(data, {
    componentName: getNameCases(data.name),
    fileName: getFileName,
    ext: EXT,
  });
}

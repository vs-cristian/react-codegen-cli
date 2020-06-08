import { IGenAnswers } from '../types/types';

export function parseAnswers(data) {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => {
        acc[v] = true;
      });
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as IGenAnswers);
}

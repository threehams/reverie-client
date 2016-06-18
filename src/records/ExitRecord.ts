import { Record } from 'immutable';

interface Exit {
  name: string;
  path?: string;
}

export type ExitType = Exit & Record.Base;

export const ExitRecord = Record<Exit>({
  name: '',
  path: '',
});

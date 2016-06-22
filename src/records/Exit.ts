import { Record } from 'immutable';

interface ExitProps {
  name: string;
  path?: string;
}

export class Exit extends Record<ExitProps>({
  name: '',
  path: '',
}) implements ExitProps {
  public name: string;
  public path: string;
};

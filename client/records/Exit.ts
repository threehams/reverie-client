import { Record } from 'immutable';

interface ExitProps {
  isExit?: boolean;
  name: string;
  path?: string;
}

export class Exit extends Record<ExitProps>({
  isExit: true,
  name: '',
  path: '',
}) implements ExitProps {
  public isExit: boolean;
  public name: string;
  public path: string;
};

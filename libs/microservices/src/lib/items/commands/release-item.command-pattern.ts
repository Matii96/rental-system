import { IMicroserviceCommand } from '../../interfaces/command.interface';

export class ReleaseItemCommandPattern implements IMicroserviceCommand {
  readonly cmd = 'RELEASE_ITEM';
}

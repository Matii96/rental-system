import { IMicroserviceCommand } from '../../interfaces/command.interface';

export class ReserveItemCommandPattern implements IMicroserviceCommand {
  readonly cmd = 'RESERVE_ITEM';
}

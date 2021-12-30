import { IMicroserviceCommand } from '../../interfaces/command.interface';

export class UnregisterAvailabilityCommandPattern implements IMicroserviceCommand {
  readonly cmd = 'UNREGISTER_AVAILABILITY';
}

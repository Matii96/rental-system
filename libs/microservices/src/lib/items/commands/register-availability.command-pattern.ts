import { IMicroserviceCommand } from '../../interfaces/command.interface';

export class RegisterAvailabilityCommandPattern implements IMicroserviceCommand {
  readonly cmd = 'REGISTER_AVAILABILITY';
}

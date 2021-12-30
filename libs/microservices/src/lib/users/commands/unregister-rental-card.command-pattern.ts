import { IMicroserviceCommand } from '../../interfaces/command.interface';

export class UnregisterRentalCardCommandPattern implements IMicroserviceCommand {
  readonly cmd = 'UNREGISTER_RENTAL_CARD';
}

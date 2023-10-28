import { ApiProperty } from '@nestjs/swagger';

/**
 * Message to be returned on success
 *
 * @type {MovementAcceptedResponseBody}
 */
export class MovementAcceptedResponse {
  @ApiProperty({
    description: 'Valeur retourner quand les transactions sont valide',
    required: true,
    type: 'string',
    default: 'Accepted',
  })
  message: string = 'Accepted';
}

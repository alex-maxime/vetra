/* eslint-disable */
export default async () => {
  const t = {
    ['../../../../De/u0301veloppement/tutos/test-dougs-compta/src/api/movements/entities/movement.entity']: await import('/Users/alexmaxime/De\u0301veloppement/tutos/test-dougs-compta/src/api/movements/entities/movement.entity'),
    ['../../../../De/u0301veloppement/tutos/test-dougs-compta/src/api/movements/entities/check-point.entity']: await import('/Users/alexmaxime/De\u0301veloppement/tutos/test-dougs-compta/src/api/movements/entities/check-point.entity'),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [import('./api/movements/entities/movement.entity'), { Movement: { id: { required: true, type: () => Number }, date: { required: true, type: () => Date }, label: { required: true, type: () => String }, amount: { required: true, type: () => Number } } }],
        [import('./api/movements/entities/check-point.entity'), { CheckPoint: { date: { required: true, type: () => Date }, balance: { required: true, type: () => Number } } }],
        [import('./api/movements/dto/validate-movements.dto'), { ValidateMovementsRequestDto: { movements: { required: true, type: () => [t['../../../../De/u0301veloppement/tutos/test-dougs-compta/src/api/movements/entities/movement.entity'].Movement] }, balances: { required: true, type: () => [t['../../../../De/u0301veloppement/tutos/test-dougs-compta/src/api/movements/entities/check-point.entity'].CheckPoint] } } }],
      ],
      controllers: [[import('./api/movements/controllers/movements.controller'), { MovementsController: { validateMovements: { type: Object } } }]],
    },
  };
};

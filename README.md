# Vetra App - Test Technique

## Description

Système de vérification de la synchronisation de données bancaires

### FRONT
Le Front est une application Mobile en React Native qui permet de faire des appel vers l'API pour vérifier des données
de synchronisations bancaire. Il permet de voir la liste des opérations et d'effectuer des corrections :
 - afficher les doublons 
 - suppression
 - ajout

### API
L'API permet de vérifier les données bancaires synchronisées, et de confirmé la validité en comparant avec les soldes 
des relevés bancaires. En cas d'érreur, il répond avec different status.


## Réponse de l'API

>Un Swagger est en place pour comprendre l'api
>[localhost:8080/swagger](localhost:8080/swagger)

La route de validation est disponible sur la route `/api/movements/validate` via la methode `POST`

### Body 

L'api accepte un objet avec 2 attributs :
- `movements` : un tableau avec la liste des transactions / données de synchronisation
- `balances`un tableau avec la liste des points de contrôle / Solde du compte

**example:**

```json
{
  "movements": [
    { "id": 1, "date": "2023-01-01", "label": "Transaction A", "amount": 100 },
    { "id": 2, "date": "2023-01-01", "label": "Transaction B", "amount": 200 },
    { "id": 3, "date": "2023-01-01", "label": "Transaction C", "amount": -80 }
  ],
  "balances": [
    { "balance": 220, "date": "2023-01-31" }
  ]
}
```

### Interface de la Réponse

le format de réponse de l'API se présente sous cette forme:

**Réponse**
```ts
export type MovementResponseBody = {
  message: string; // I’m a teapot
  reasons?: Reason[];
};
```

**Raison**
```ts
export type Reason = {
  data: Movement[]; // Liste des transaction en cause
  checkpoint?: CheckPoint; // Si disponnible, le point de controle où ça c'est produit
  reason: 'DUPLICATE_TRANSACTION_ENTRY' |'MISSING_TRANSACTION_ENTRY' | 'MISSING_CHECK_POINT' | 'MISSMATCH_TRANSACTION_AND_CHECK_POINT';
};
```

**example:**

```json
{
  "message": "I’m a teapot",
  "reasons": [
    {
      "data": [
        {
          "id": 1,
          "date": "2023-01-01",
          "label": "Transaction A",
          "amount": 100,
          "status": "INVALID"
        },
        {
          "id": 2,
          "date": "2023-01-01",
          "label": "Transaction B",
          "amount": 200,
          status: "INVALID"
        }
      ],
      "reason": "MISSING_CHECK_POINT"
    }
  ]
}
```

### Explication de `reason`:

| Status                                  | Signification                                                                                                                   |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `DUPLICATE_TRANSACTION_ENTRY`           | Présence de doublons dans la liste des transactions                                                                             |
| `MISSING_TRANSACTION_ENTRY`             | La somme des transaction est inférieure aux solde d'un point de contrôle. il Manque peut être une transaction ? ou modifier une |
| `MISSING_CHECK_POINT`                   | Des transactions n'on pas de point de contrôle. on ne peux pas vérifier la validité par rapport aux solde                       |
| `MISSMATCH_TRANSACTION_AND_CHECK_POINT` | La somme des transaction est supérieure aux solde d'un point de contrôle. il faut modifier une/des transaction(s)               |

## Plantilla para crear apis con AWS APPSYNC / LAMBDAS / MONGODB
---
### Stack usado
- Serverless framework versión 3
- AWS AppSync
- AWS Lambda
- Typescript


### 1. Configuración Serverless
- El archivo ```serverless.yml``` contiene las configuraciones del API a crear
- En la sección ```appSync``` es posible configurar el modo de autenticación (```API_KEY``` o ```AMAZON_COGNITO_USER_POOLS```)
```bash
appSync:
  name: ${self:provider.environment.APPSYNC_NAME}
  ####################################
  #Auth mode: API KEY
  ####################################
  # apiKeys:
  #   - name: monthlyKey
  #     expiresAfter: 1M
  # authentication:
  #   type: API_KEY


  ####################################
  #Auth mode: USER POOLS
  ####################################
  authentication:
    type: 'AMAZON_COGNITO_USER_POOLS'
    config:
      userPoolId: 'YOUR_USER_POOL_ID'
```

```NOTA```:<br>
Usando ```AMAZON_COGNITO_USER_POOLS``` es posible incluir las directivas ```@aws_cognito_user_pools``` y ```@aws_auth``` en la definición del esquema graphql para restringir por roles / grupos definidos en cognito.

```bash
# Define the queries
type Query {
  listBooks: [Book]
  @aws_cognito_user_pools(cognito_groups: ["admin"])
  @aws_auth(cognito_groups: ["admin"])
  getBookByTitle(title: String): [Book]
}
```

- Los recursos que serverless requiere se encuentran en el directorio ```sls_resources```
```bash
|-sls_resources/
    |-- appsync-schemas/ (archivos graphql con las definiciones de las entidades)
    |-- mapping-templates/ (archivos vtl usados por los resolvers)
|- datasources.yml (origen de datos: dynamo, lambda)
|- resolvers.yml
|- lambdas.yml
```

### 2. Aplicación
El directorio ```src/``` contiene la lógica a implementarse en lambdas, compuesto de los siguientes subdirectorios:
```bash
|-src/
    |-- db/models/ (contiene los esquemas para las entidades a mongodb)
    |-- db/database.ts (conexión a mongodb)
    |-- handler/ (contiene la lógica para cada lambda)
```

### 3. Deploy
```bash
npx serverless deploy --verbose
```

### 4. Optional (lambda local test)
```bash
npx serverless invoke local --function getBookByTitle -d '{"arguments": {"input":{"title":""}}}'
```

### Referencias:
- https://github.com/sid88in/serverless-appsync-plugin
- https://www.serverless.com/
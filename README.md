
# copybookgenerator
#### Gerador de copybook para programas COBOL

Este serviço gera copybook padronizado para serem utilizados em programas COBOL. Consta com layout padrão com: Nome, Autor, Descrição, Tamanho, Data, Comentários com descrição de cada campo, Header, Body e Trailer, tratamento de Campos Input/Output, Fillers, Redefines e Decimais.


## Autores

- [@edergr](https://github.com/edergr)

## Documentação da API

### Criação de Copybook

```bash
  POST /create
```

Exemplo de body para a requisição:

```json
{
  "name": "EDERWCPY",
  "author": "EDER RODRIGUES",
  "description": "MOVIMENTACOES",
  "size": 26,
  "date": "01/01/2023",
  "header": {
    "name": "HEADER",
    "fields": [
      {
        "filler": false,
        "name": "OBJETIVO-ARQUIVO",
        "description": "OBJETIVO DO ARQUIVO",
        "size": 25,
        "type": "X"
      },
      {
        "filler": true,
        "size": 1
      }
    ]
  },
  "body": [
    {
      "redefines": "HEADER",
      "name": "MOVIMENTACOES",
      "fields": [
        {
          "filler": false,
          "name": "DATA-MOVIMENTACAO",
          "description": "DATA DA MOVIMENTACAO",
          "size": 10,
          "type": "X",
          "inOut": "I"
        },
        {
          "filler": false,
          "name": "TIPO-MOVIMENTACAO",
          "description": "TIPO DA MOVIMENTACAO",
          "size": 1,
          "type": "X",
          "inOut": "I"
        },
        {
          "filler": false,
          "name": "VALOR-MOVIMENTACAO",
          "description": "VALOR DA MOVIMENTACAO",
          "size": 13,
          "type": "9",
          "decimal": 2,
          "inOut": "I"
        }
      ]
    }
  ],
  "trailer": {
    "redefines": "HEADER",
    "name": "ACUMULADORES",
    "fields": [
      {
        "filler": false,
        "name": "VLR-ACUMULADO",
        "description": "VALOR ACUMULADO",
        "size": 13,
        "type": "9",
        "decimal": 2
      },
      {
        "filler": true,
        "size": 11
      }
    ]
  }
}
```
Response:

- 200   Ok

```json
      ******************************************************************
      *                                                                *
      *    BOOKNAME...: EDERWCPY                                       *
      *    DESCRIPTION: MOVIMENTACOES                                  *
      *    DATE.......: 01/01/2023                                     *
      *    AUTHOR.....: EDER RODRIGUES                                 *
      *    SIZE.......: 26                                             *
      *                                                                *
      *----------------------------------------------------------------*
      *                                                                *
      *    H-OBJETIVO-ARQUIVO.....: OBJETIVO DO ARQUIVO                *
      *                                                                *
      *    I-DATA-MOVIMENTACAO....: DATA DA MOVIMENTACAO               *
      *    I-TIPO-MOVIMENTACAO....: TIPO DA MOVIMENTACAO               *
      *    I-VALOR-MOVIMENTACAO...: VALOR DA MOVIMENTACAO              *
      *                                                                *
      *    T-VLR-ACUMULADO........: VALOR ACUMULADO                    *
      *                                                                *
      *----------------------------------------------------------------*
      *                                                                *
       05  EDERWCPY-REGISTER.
           10 EDERWCPY-HEADER.
              15 EDERWCPY-H-OBJETIVO-ARQUIVO           PIC X(25).
              15 FILLER                                PIC X(1).
           10 EDERWCPY-MOVIMENTACOES
              REDEFINES EDERWCPY-HEADER.
              15 EDERWCPY-I-DATA-MOVIMENTACAO          PIC X(10).
              15 EDERWCPY-I-TIPO-MOVIMENTACAO          PIC X(1).
              15 EDERWCPY-I-VALOR-MOVIMENTACAO         PIC 9(13)V99.
           10 EDERWCPY-ACUMULADORES
              REDEFINES EDERWCPY-HEADER.
              15 EDERWCPY-T-VLR-ACUMULADO              PIC 9(13)V99.
              15 FILLER                                PIC X(11).
      *                                                                *
      ******************************************************************
```
---
### Configuração

| Parâmetro            | Tipo      | Padrão   | Descrição  |
| :------------------- | :-------- | :------- | :---------- |
| `name`               | `string`  | -        | Nome do copybook |
| `author`             | `string`  | -        | Autor |
| `description`        | `string`  | -        | Descrição |
| `size`               | `integer` | -        | Tamanho total do copybook |
| `date`               | `string`  | -        | Data de criação - dd/mm/aaaa |
| `header`             | `object`  | -        | Grupo Cabeçalho |
| `↳ name`             | `string`  | `HEADER` | Nome do cabeçalho |
| `↳ fields`           | `object`  | -        | Campos que compõem o cabeçalho |
| ‎ ‎ ‎ ‎ ‎ `↳ filler`      | `boolean` | `false`  | Define se o campo é filler    |
| ‎ ‎ ‎ ‎ ‎ `↳ name`        | `string`  | -        | Nome do campo     |
| ‎ ‎ ‎ ‎ ‎ `↳ description` | `string`  | -        | Descrição do campo *para comentário* |
| ‎ ‎ ‎ ‎ ‎ `↳ size`        | `string`  | -        | Tamanho |
| ‎ ‎ ‎ ‎ ‎ `↳ type`        | `string`  | `"X"`    | 'X' ou '9' |
| `body`               | `array `  | -        | Grupo de Registros |
| `↳ redefines`        | `string`  | -        | Redefines -> geralmente header.name |
| `↳ name`             | `string`  | -        | Nome do grupo de campos |
| `↳ fields`           | `object`  | -        | Campos que compõem o registro           |
| ‎ ‎ ‎ ‎ ‎ `↳ filler`      | `boolean` | `false`  | Define se o campo é filler |
| ‎ ‎ ‎ ‎ ‎ `↳ name`        | `string`  | -        | Nome do campo |
| ‎ ‎ ‎ ‎ ‎ `↳ description` | `string`  | -        | Descrição do campo *para comentário* |
| ‎ ‎ ‎ ‎ ‎ `↳ size`        | `string`  | -        | Tamanho |
| ‎ ‎ ‎ ‎ ‎ `↳ decimal`     | `integer` | -        | Parte decimal do campo, se type = "9" |
| ‎ ‎ ‎ ‎ ‎ `↳ type`        | `string`  | `"X"`    | 'X' ou '9' |
| ‎ ‎ ‎ ‎ ‎ `↳ inOut`       | `string`  | `null`   | Input/Output: 'I' ou 'O' |
| `trailer`            | `object ` | -        | Grupo Trailer |
| `↳ redefines`        | `string`  | -        | Redefines -> geralmente header.name |
| `↳ name`             | `string`  | -        | Nome do Trailer |
| `↳ fields`           | `object`  | -        | Campos que compõem o trailer            |
| ‎ ‎ ‎ ‎ ‎ `↳ filler`      | `boolean` | `false`  | Define se o campo é filler |
| ‎ ‎ ‎ ‎ ‎ `↳ name`        | `string`  | -        | Nome do campo |
| ‎ ‎ ‎ ‎ ‎ `↳ description` | `string`  | -        | Descrição do campo *para comentário* |
| ‎ ‎ ‎ ‎ ‎ `↳ size`        | `string`  | -        | Tamanho |
| ‎ ‎ ‎ ‎ ‎ `↳ decimal`     | `integer` | -        | Parte decimal do campo, se type = "9"
| ‎ ‎ ‎ ‎ ‎ `↳ type`        | `string`  | `"X"`    | 'X' ou '9' |



### Regras de obrigatoriedade

| Parâmetro      | Obrigatório  | Tamanho    |
| :------------- | :--------------- | :--------- |
| `name`         | `true`           | `fixedLength 8`  |
| `author`       | `false`          | `maxLength 45`   |
| `description`  | `false`          | `maxLength 45`   |
| `size`         | `false`          | -          |
| `date`         | `false`          | `fixedLength 10` |
| `header`       | `true`           | -          |
| `body`         | `true`           | -          |
| `trailer`      | `false`          | -          |

### `header`

| Parâmetro      | Obrigatório  | Tamanho    |
| :------------- | :--------------- | :--------- |
| `name`         | `true`           | `maxLength 20`   |
| `fields`       | `true`           | -          |
| `fields.filler`      | `false`    | -          |
| `fields.name`        | `false`    | `maxLength 21`   |
| `fields.description` | `false`    | `maxLength 34`   |
| `fields.size`        | `true`     | `minimunValue 1` |
| `fields.type`        | `false`    | `"X" ou "9"`     |

### `body`

| Parâmetro      | Obrigatório  | Tamanho    |
| :------------- | :--------------- | :--------- |
| `redefines`    | `true`           | -          |
| `name`         | `true`           | `maxLength 20`   |
| `fields`       | `true`           | -          |
| `fields.filler`      | `false`    | -          |
| `fields.name`        | `false`    | `maxLength 21`   |
| `fields.description` | `false`    | `maxLength 34`   |
| `fields.size`        | `true`     | `minimunValue 1` |
| `fields.type`        | `false`    | `"X" ou "9"`     |
| `fields.decimal`     | `false`    | `minimunValue 1` |
| `fields.inOut`       | `false`    | `"I","O" ou null` |

### `trailer` (não obrigatório)

| Parâmetro      | Obrigatório  | Tamanho    | 
| :------------- | :--------------- | :--------- | 
| `redefines`    | `true`           | -          | 
| `name`         | `true`           | `maxLength 20`   | 
| `fields`       | `true`           | -          | 
| `fields.filler`      | `false`    | -          | 
| `fields.name`        | `false`    | `maxLength 21`   |
| `fields.description` | `false`    | `maxLength 34`   |
| `fields.size`        | `true`     | `minimunValue 1` |
| `fields.type`        | `false`    | `"X" ou "9"`     |
| `fields.decimal`     | `false`    | `minimunValue 1` |

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:edergr/copybookGenerator.git
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


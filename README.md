# Desafio de Teste — Dominó dupla-seis

Casos de teste em JavaScript para uma partida de Dominó entre dois jogadores. O projeto modela a mesa, as mãos, as jogadas legais, o passe e a vitória. Ele existe para validar regras de negócio e transições de estado, não para fornecer uma interface gráfica ou implementar todas as variantes do jogo.

## Colaborador

| Nome | Participação |
| --- | --- |
| Felipe de Almeida Matrone | Implementação do modelo, cenários de teste e documentação. |

## Como executar

O projeto usa exclusivamente os módulos nativos `node:test` e `node:assert/strict`. Requer Node.js 18 ou superior e não necessita de instalação de pacotes.

```bash
npm test
```

Resultado esperado: **13 testes aprovados**, sem falhas nem dependências externas.

## Especificação modelada

### Jogadores, mãos e mesa

A partida recebe exatamente duas mãos na construção. Cada pedra é uma tupla `[esquerda, direita]`, por exemplo `[6, 1]`. As mãos são copiadas pelo modelo, evitando que a lista externa seja usada diretamente como estado interno.

O jogador `0` começa. A mesa inicia vazia; por isso, na primeira jogada qualquer pedra da mão do jogador da vez pode ser usada para abrir a partida.

### Encaixe nas pontas

Depois da abertura, uma pedra precisa combinar com uma das duas extremidades da mesa. O método `extremos()` devolve:

```js
[valorDaPontaEsquerda, valorDaPontaDireita]
```

Uma pedra pode ser colocada à esquerda ou à direita. Quando necessário, o modelo inverte a orientação da pedra antes de inseri-la, preservando o encaixe. Por exemplo, se a ponta direita for `1`, a pedra `[4, 1]` é colocada como `[1, 4]`.

| Situação | Resultado esperado |
| --- | --- |
| Mesa vazia | qualquer pedra abre a mesa |
| Pedra compatível | é removida da mão e inserida no lado solicitado |
| Pedra compatível apenas após inversão | é invertida automaticamente |
| Pedra incompatível | a jogada é recusada e o estado é preservado |
| Pedra dupla | pode encaixar sem precisar de inversão |

### Turno, passe e encerramento

Após uma jogada válida, a vez passa para o outro jogador. A exceção é a jogada que zera a mão do participante: nesse caso, a partida é encerrada e o jogador é registrado em `vencedor`.

O passe não é uma ação livre. O método `passar()` só aceita a troca de vez quando o jogador atual não possui nenhuma pedra compatível com as duas pontas da mesa. Se houver ao menos uma jogada disponível, o passe é recusado.

Depois do encerramento, não é permitido jogar nem passar.

## Modelo testado

O arquivo [`src/partida.js`](src/partida.js) exporta a classe `PartidaDomino`.

| Membro | Responsabilidade |
| --- | --- |
| `new PartidaDomino(maos)` | Cria a partida com duas mãos, mesa vazia e jogador `0` na vez. |
| `extremos()` | Retorna as duas pontas da mesa ou `null` quando ela ainda está vazia. |
| `jogadasPossiveis(jogador?)` | Lista as pedras e lados legais para o jogador informado ou para o jogador da vez. |
| `jogar(indice, lado?)` | Valida e aplica uma jogada, aceitando `esquerda` ou `direita`. |
| `passar()` | Transfere a vez somente quando não existe uma jogada legal. |
| `maos`, `mesa`, `vez` | Estado público usado pelos testes para conferir as transições. |
| `encerrada`, `vencedor` | Estado final da partida. |

As opções retornadas por `jogadasPossiveis` incluem o índice da pedra, o lado onde ela pode ser usada e se a inversão é necessária. Isso permite testar as possibilidades sem depender de uma interface.

## Organização e cobertura dos testes

| Arquivo | Casos | Cenários verificados |
| --- | ---: | --- |
| [`test/partida.test.js`](test/partida.test.js) | 8 | quantidade de jogadores, abertura, encaixe, inversão, lados, passe, recusa e vitória |
| [`test/estado-e-validacao.test.js`](test/estado-e-validacao.test.js) | 5 | lista de jogadas, imutabilidade em erro, duplas, mudança de turno e estado final |
| **Total** | **13** | fluxo normal, ações inválidas e efeitos no estado |

### Exemplos de casos cobertos

- A construção falha quando a partida não recebe exatamente dois jogadores.
- A primeira pedra estabelece as duas pontas da mesa.
- Uma pedra compatível é invertida se essa for a orientação necessária para encaixar.
- Uma tentativa de jogar pedra incompatível mantém a mesa e a mão sem alteração.
- Uma pedra pode ser adicionada ao lado esquerdo da mesa.
- O passe é permitido somente sem jogadas legais e é recusado quando existe uma opção.
- Uma pedra dupla não exige inversão para se conectar à mesa.
- Quando a última pedra da mão é jogada, o vencedor é preservado e ações posteriores são recusadas.

## Qualidade dos cenários

Os testes verificam não apenas retornos e exceções, mas também o estado após cada operação. Esse cuidado é importante em um jogo de turnos: uma ação inválida não pode remover pedra da mão, alterar a mesa, trocar a vez ou encerrar a partida por engano.

Os cenários são determinísticos porque as mãos são fornecidas na construção. Assim, cada caso monta somente as pedras necessárias para testar uma regra, sem depender de sorteio ou distribuição aleatória.

## Decisões de escopo

O projeto considera uma partida simplificada de duas pessoas. Não foram implementadas distribuição automática das 28 pedras, compra no monte, cálculo de pontuação quando a partida bloqueia, validação do intervalo dos valores da pedra, interface visual ou partida para mais de dois jogadores. Essas regras podem ser incluídas em ciclos futuros, mas não são necessárias para os comportamentos atualmente cobertos pela suíte.

## Estrutura do projeto

```text
desafio_teste_domino/
├── src/
│   └── partida.js
├── test/
│   ├── partida.test.js
│   └── estado-e-validacao.test.js
├── package.json
└── README.md
```

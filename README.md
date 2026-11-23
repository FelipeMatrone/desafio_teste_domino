# Desafio de Teste — Dominó

Modelo de uma partida dupla-seis para dois jogadores e suíte automatizada em JavaScript. O objetivo é exercitar regras, transições de estado e recusas — não oferecer uma interface gráfica.

## Como executar

Requer Node.js 18 ou superior. Não há dependências externas.

```bash
npm test
```

## Especificação modelada

- A partida recebe exatamente dois jogadores e suas mãos de pedras `[esquerda, direita]`.
- A primeira pedra abre a mesa. Depois disso, cada pedra deve encaixar em uma ponta; a inversão é aplicada quando necessária.
- Uma jogada válida remove a pedra da mão e passa a vez. O passe só é aceito quando não existe nenhuma jogada possível.
- A partida termina quando um jogador zera sua mão; novas ações são recusadas.

## API e testes

`PartidaDomino` expõe `jogar`, `passar`, `extremos` e `jogadasPossiveis`. Os testes ficam separados entre o fluxo principal e a validação de estado:

| Arquivo | Cenários verificados |
| --- | --- |
| `test/partida.test.js` | abertura, encaixe, inversão, lados, passe e vitória |
| `test/estado-e-validacao.test.js` | jogadas disponíveis, imutabilidade em erro, duplas e encerramento |

As recusas são verificadas também pela preservação do estado: uma pedra incompatível não altera a mesa nem a mão.

## Colaborador

- Felipe Matrone — implementação e casos de teste.

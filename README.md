# Desafio — Teste de Dominó

Casos de teste em JavaScript para uma partida de dominó dupla-seis com dois jogadores.

## Regras modeladas

Cada pedra é `[esquerda, direita]`; a primeira jogada abre a mesa, as demais devem
combinar com uma das pontas. A vez alterna após uma jogada válida. Um jogador só pode
passar se não tiver jogada disponível; vence quem ficar sem pedras.

## Executar

```bash
npm test
```

Os testes cobrem criação da partida, encaixe, inversão, lados da mesa, passe, recusas
e encerramento.

import test from 'node:test';
import assert from 'node:assert/strict';
import { PartidaDomino } from '../src/partida.js';

test('lista jogadas possíveis na mesa vazia', () => { const p = new PartidaDomino([[[1,2],[3,4]], [[0,0]]]); assert.equal(p.jogadasPossiveis().length, 2); });
test('não altera a mesa ao tentar uma pedra incompatível', () => { const p = new PartidaDomino([[[6,1]], [[2,3]]]); p.jogar(0); const antes = JSON.stringify(p.mesa); assert.throws(() => p.jogar(0)); assert.equal(JSON.stringify(p.mesa), antes); });
test('dupla pode ser usada em qualquer ponta sem inversão', () => { const p = new PartidaDomino([[[2,2],[4,5]], [[2,2]]]); p.jogar(0); assert.ok(p.jogadasPossiveis().every((j) => j.inverter === false)); });
test('troca a vez ao passar', () => { const p = new PartidaDomino([[[1,1],[4,4]], [[2,3]]]); p.jogar(0); p.passar(); assert.equal(p.vez, 0); });
test('jogada vencedora preserva quem venceu', () => { const p = new PartidaDomino([[[3,4]], [[4,5]]]); p.jogar(0); assert.equal(p.vencedor, 0); assert.equal(p.encerrada, true); });

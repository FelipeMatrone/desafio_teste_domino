import test from 'node:test';
import assert from 'node:assert/strict';
import { PartidaDomino } from '../src/partida.js';

test('exige exatamente dois jogadores', () => assert.throws(() => new PartidaDomino([[]]), /dois jogadores/i));
test('a primeira pedra inicia a mesa', () => { const p = new PartidaDomino([[[6, 6]], [[1, 2]]]); p.jogar(0); assert.deepEqual(p.extremos(), [6, 6]); assert.equal(p.vencedor, 0); });
test('aceita pedra compatível e inverte quando necessário', () => { const p = new PartidaDomino([[[6, 1], [2, 3]], [[1, 4]]]); p.jogar(0); p.jogar(0); assert.deepEqual(p.mesa, [[6, 1], [1, 4]]); });
test('recusa pedra incompatível sem alterar a mão', () => { const p = new PartidaDomino([[[6, 1],[4,4]], [[2, 3]]]); p.jogar(0); assert.throws(() => p.jogar(0), /incompatível/i); assert.equal(p.maos[1].length, 1); });
test('permite jogar no lado esquerdo', () => { const p = new PartidaDomino([[[2, 5],[4,4]], [[2, 1],[3,3]]]); p.jogar(0); p.jogar(0, 'esquerda'); assert.deepEqual(p.mesa, [[1, 2], [2, 5]]); });
test('só permite passar sem jogada disponível', () => { const p = new PartidaDomino([[[1, 1],[4,4]], [[2, 3]]]); p.jogar(0); p.passar(); assert.equal(p.vez, 0); });
test('recusa passar quando existe jogada', () => { const p = new PartidaDomino([[[1, 2],[4,4]], [[2, 4]]]); p.jogar(0); assert.throws(() => p.passar(), /disponível/i); });
test('encerra quando um jogador fica sem pedras', () => { const p = new PartidaDomino([[[1, 2]], [[2, 4]]]); p.jogar(0); assert.throws(() => p.jogar(0), /encerrada/i); });

export class PartidaDomino {
  constructor(maos) {
    if (!Array.isArray(maos) || maos.length !== 2) throw new Error('A partida exige dois jogadores.');
    this.maos = maos.map((mao) => mao.map(([a, b]) => [a, b]));
    this.mesa = [];
    this.vez = 0;
    this.encerrada = false;
    this.vencedor = null;
  }
  extremos() { return this.mesa.length ? [this.mesa[0][0], this.mesa.at(-1)[1]] : null; }
  jogadasPossiveis(jogador = this.vez) {
    const mao = this.maos[jogador];
    if (!this.mesa.length) return mao.map((_, indice) => ({ indice, lado: 'direita', inverter: false }));
    const [esquerda, direita] = this.extremos();
    return mao.flatMap(([a, b], indice) => {
      const opcoes = [];
      if (b === esquerda) opcoes.push({ indice, lado: 'esquerda', inverter: false });
      if (a === esquerda && a !== b) opcoes.push({ indice, lado: 'esquerda', inverter: true });
      if (a === direita) opcoes.push({ indice, lado: 'direita', inverter: false });
      if (b === direita && a !== b) opcoes.push({ indice, lado: 'direita', inverter: true });
      return opcoes;
    });
  }
  jogar(indice, lado = 'direita') {
    if (this.encerrada) throw new Error('Partida encerrada.');
    const pedra = this.maos[this.vez][indice];
    if (!pedra) throw new Error('Pedra inexistente.');
    const opcao = this.jogadasPossiveis().find((j) => j.indice === indice && j.lado === lado);
    if (!opcao) throw new Error('Jogada incompatível com a mesa.');
    const colocada = opcao.inverter ? [pedra[1], pedra[0]] : pedra;
    this.maos[this.vez].splice(indice, 1);
    if (lado === 'esquerda') this.mesa.unshift(colocada); else this.mesa.push(colocada);
    if (!this.maos[this.vez].length) { this.encerrada = true; this.vencedor = this.vez; }
    else this.vez = 1 - this.vez;
    return colocada;
  }
  passar() {
    if (this.encerrada) throw new Error('Partida encerrada.');
    if (this.jogadasPossiveis().length) throw new Error('Há jogada disponível.');
    this.vez = 1 - this.vez;
  }
}

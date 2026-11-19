import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { avaliar } from '../src/motor.js';
import { montarSaida } from '../src/saida.js';
import { entradaDoExemplo, textoDoExemplo } from './fabrica.js';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const tsx = join(raiz, 'node_modules', '.bin', 'tsx');
const cli = join(raiz, 'src', 'cli.ts');
const pasta = mkdtempSync(join(tmpdir(), 'reembolso-cli-'));
afterAll(() => rmSync(pasta, { recursive: true, force: true }));

let contador = 0;
/** Escreve a entrada num arquivo temporário e roda `calcular`; devolve o processo e o caminho da saída. */
function calcular(textoEntrada: string) {
  contador += 1;
  const input = join(pasta, `entrada-${contador}.json`);
  const output = join(pasta, `saida-${contador}.json`);
  writeFileSync(input, textoEntrada);
  const r = spawnSync(tsx, [cli, 'calcular', '--input', input, '--output', output], { encoding: 'utf8' });
  return { ...r, output };
}

const lerJson = (caminho: string) => JSON.parse(readFileSync(caminho, 'utf8'));

describe('Spec §9 — CLI', () => {
  it('AC: exemplos/despesas-exemplo.json → arquivo de saída igual ao documento da spec §4 montado para o exemplo', () => {
    const r = calcular(textoDoExemplo());
    expect(r.status).toBe(0);
    const saida = lerJson(r.output);
    const entrada = entradaDoExemplo();
    expect(saida).toEqual(montarSaida(entrada, avaliar(entrada)));
    expect(saida.totais).toEqual({ valor_reembolsado: 815.43, quantidade: { integral: 5, parcial: 3, recusada: 6 } });
  });

  it('AC: entrada fora do formato → não cria arquivo de saída, código de saída ≠ 0 e o erro cita o campo', () => {
    const quebrada = JSON.parse(textoDoExemplo());
    delete quebrada.despesas[0].valor;
    const r = calcular(JSON.stringify(quebrada));
    expect(r.status).not.toBe(0);
    expect(existsSync(r.output)).toBe(false);
    expect(r.stderr).toContain('despesas[0].valor');
  });

  it('JSON malformado → não cria arquivo de saída e código de saída ≠ 0', () => {
    const r = calcular('{ "colaborador": ');
    expect(r.status).not.toBe(0);
    expect(existsSync(r.output)).toBe(false);
    expect(r.stderr).toContain('JSON malformado');
  });

  it('AC: lista de despesas vazia → despesas vazio e totais zerados', () => {
    const vazia = { ...JSON.parse(textoDoExemplo()), despesas: [] };
    const r = calcular(JSON.stringify(vazia));
    expect(r.status).toBe(0);
    const saida = lerJson(r.output);
    expect(saida.despesas).toEqual([]);
    expect(saida.totais).toEqual({ valor_reembolsado: 0, quantidade: { integral: 0, parcial: 0, recusada: 0 } });
  });

  it('AC: duas execuções com a mesma entrada produzem arquivos idênticos byte a byte', () => {
    const a = calcular(textoDoExemplo());
    const b = calcular(textoDoExemplo());
    expect(readFileSync(a.output, 'utf8')).toBe(readFileSync(b.output, 'utf8'));
  });

  it('AC: reordenar as despesas na entrada não altera nenhum valor_reembolsado', () => {
    const original = JSON.parse(textoDoExemplo());
    const invertida = { ...original, despesas: [...original.despesas].reverse() };
    const porId = (caminho: string) =>
      Object.fromEntries(lerJson(caminho).despesas.map((d: { id: string; valor_reembolsado: number }) => [d.id, d.valor_reembolsado]));
    expect(porId(calcular(JSON.stringify(invertida)).output)).toEqual(porId(calcular(textoDoExemplo()).output));
  });

  it('argumentos inválidos → mensagem de uso e código de saída ≠ 0', () => {
    const semOutput = spawnSync(tsx, [cli, 'calcular', '--input', 'x.json'], { encoding: 'utf8' });
    expect(semOutput.status).not.toBe(0);
    expect(semOutput.stderr).toContain('Uso:');
    const outroComando = spawnSync(tsx, [cli, 'listar', '--input', 'x.json', '--output', 'y.json'], { encoding: 'utf8' });
    expect(outroComando.status).not.toBe(0);
  });

  it('arquivo de entrada inexistente → código de saída ≠ 0 e nenhuma saída', () => {
    const output = join(pasta, 'nunca.json');
    const r = spawnSync(tsx, [cli, 'calcular', '--input', join(pasta, 'nao-existe.json'), '--output', output], { encoding: 'utf8' });
    expect(r.status).not.toBe(0);
    expect(existsSync(output)).toBe(false);
  });
});

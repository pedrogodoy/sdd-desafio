// Interface de linha de comando (plan §2): único módulo que faz I/O.
// Uso: reembolso calcular --input <entrada.json> --output <saida.json>
import { readFileSync, writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { ErroEntrada, interpretarEntrada } from './entrada.js';
import { avaliar } from './motor.js';
import { montarSaida } from './saida.js';

const USO = 'Uso: reembolso calcular --input <entrada.json> --output <saida.json>';

const SAIDA_OK = 0;
const SAIDA_ENTRADA_INVALIDA = 1;
const SAIDA_USO_INVALIDO = 2;

function executar(argumentos: string[]): number {
  let opcoes: { input?: string; output?: string };
  let posicionais: string[];
  try {
    const r = parseArgs({
      args: argumentos,
      options: { input: { type: 'string' }, output: { type: 'string' } },
      allowPositionals: true,
      strict: true,
    });
    opcoes = r.values;
    posicionais = r.positionals;
  } catch (e) {
    console.error(`${(e as Error).message}\n${USO}`);
    return SAIDA_USO_INVALIDO;
  }

  if (posicionais.length !== 1 || posicionais[0] !== 'calcular' || !opcoes.input || !opcoes.output) {
    console.error(USO);
    return SAIDA_USO_INVALIDO;
  }

  let texto: string;
  try {
    texto = readFileSync(opcoes.input, 'utf8');
  } catch (e) {
    console.error(`Não foi possível ler ${opcoes.input}: ${(e as Error).message}`);
    return SAIDA_ENTRADA_INVALIDA;
  }

  let documento: string;
  try {
    const entrada = interpretarEntrada(texto);
    documento = `${JSON.stringify(montarSaida(entrada, avaliar(entrada)), null, 2)}\n`;
  } catch (e) {
    if (e instanceof ErroEntrada) {
      // Spec §4: entrada fora do formato é rejeitada por inteiro — nenhuma saída é gerada.
      console.error(e.message);
      return SAIDA_ENTRADA_INVALIDA;
    }
    throw e;
  }

  writeFileSync(opcoes.output, documento, 'utf8');
  return SAIDA_OK;
}

process.exitCode = executar(process.argv.slice(2));

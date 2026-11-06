import { describe, expect, it } from 'vitest';
import { Decimal } from 'decimal.js';

describe('T-001 — setup do projeto', () => {
  it('executa testes e importa decimal.js', () => {
    expect(new Decimal('0.1').plus('0.2').toString()).toBe('0.3');
  });
});

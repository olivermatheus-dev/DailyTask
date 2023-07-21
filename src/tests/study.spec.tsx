// arquivo de teste: sum.test.js

// Função de soma
function sum(a: number, b: number) {
  return a + b;
}

// Teste para verificar a função de soma
test("soma 1 + 2 para obter 3", () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});

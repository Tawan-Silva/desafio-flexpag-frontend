export interface DataContext {
  value: Currency[];
}

export interface Currency {
  cotacaoCompra: number;
  cotacaoVenda: number;
  dataHoraCotacao: String;
}

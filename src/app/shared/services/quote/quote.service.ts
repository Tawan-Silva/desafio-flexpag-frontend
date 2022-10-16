import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataContext } from "../../models/Currency";

@Injectable({
  providedIn: "root",
})
export class QuoteService {
  constructor(private http: HttpClient) {}

  getCurrencyQuote(coin: String, startDate: String, finalDate: String) {
    return this.http.get(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='${coin}'&@dataInicial='${startDate}'&@dataFinalCotacao='${finalDate}'&$top=1000&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
    ) as Observable<DataContext>;
  }

  getCurrencyQuoteOnInit() {
    return this.http.get(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='EUR'&@dataInicial='07-06-2022'&@dataFinalCotacao='07-25-2022'&$top=1000&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
    ) as Observable<DataContext>;
  }
}

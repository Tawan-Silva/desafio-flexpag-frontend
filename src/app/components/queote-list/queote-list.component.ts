import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { Currency } from "src/app/shared/models/Currency";
import { typeCoins } from "src/app/shared/models/TypeCoins";
import { QuoteService } from "src/app/shared/services/quote/quote.service";

@Component({
  selector: "app-queote-list",
  templateUrl: "./queote-list.component.html",
  styleUrls: ["./queote-list.component.scss"],
})
export class QueoteListComponent implements OnInit {
  public displayedColumns: string[] = ["purchase", "sale", "date"];
  public disabled: boolean = false;
  public selected: string = "";
  public typeCoins = typeCoins;
  public currentType: string = "";
  public startDate: string = "";
  public finalDate: string = "";
  public matButtonToggleGroup: string = "";
  public allCurrency: Currency[] = [];
  public dataSource = new MatTableDataSource<Currency>(this.allCurrency);
  public clickedRows = new Set<Currency>(this.allCurrency);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;
  @ViewChild(MatTable) public table!: MatTable<any>;

  constructor(
    private queoteService: QuoteService,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource(this.allCurrency);
  }

  ngOnInit(): void {
    this.getAllCurrency();
    this.typeCoins.forEach((coins: any) => {
      this.selected = coins.TEXT;
    });
  }

  public getAllCurrency() {
    this.isLoadingResults = true;
    this.queoteService.getCurrencyQuoteOnInit().subscribe((data) => {
      data.value.map((prop) => {
        this.allCurrency.push(prop);
      });
      this.isLoadingResults = false;
      this.isRateLimitReached = data === null;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  public onSubmit(currencyType: string, startDate: any, finalDate: any) {
    startDate = moment(startDate).format("MM-DD-yyyy");
    finalDate = moment(finalDate).format("MM-DD-yyyy");

    if (!this.validateForm(currencyType, startDate, finalDate)) return;

    this.getFilteredCurrentQuote(currencyType, startDate, finalDate);
  }

  private validateForm(currencyType: string, startDate: any, finalDate: any) {
    if (currencyType == "" || startDate == "" || finalDate == "") {
      this.toastr.error("Todos os campos são obrigários.", "Campos nulos!", {
        progressBar: true,
        progressAnimation: "decreasing",
        closeButton: true,
      });
      return false;
    } else if (startDate == "Invalid date" || finalDate == "Invalid date") {
      this.toastr.error("Todos os campos são obrigários.", "Campos nulos!", {
        progressBar: true,
        progressAnimation: "decreasing",
        closeButton: true,
      });
      return false;
    }

    if (startDate > finalDate) {
      this.toastr.error(
        "A data inicial não pode ser maior que a data final.",
        "Intervalo de datas inválido!",
        {
          progressBar: true,
          progressAnimation: "decreasing",
          closeButton: true,
        }
      );
      return false;
    }
    return true;
  }

  private getFilteredCurrentQuote(
    currencyType: string,
    startDate: any,
    finalDate: any
  ) {
    this.isLoadingResults = true;
    this.queoteService
      .getCurrencyQuote(currencyType, startDate, finalDate)
      .subscribe((data) => {
        this.allCurrency = [];
        this.dataSource = new MatTableDataSource<Currency>([]);
        this.allCurrency = data.value;
        this.dataSource = new MatTableDataSource<Currency>(this.allCurrency);
        this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;
      });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public refresh() {
    if (this.disabled) {
      this.dataSource = new MatTableDataSource<Currency>([]);
      setTimeout(() => {
        this.getAllCurrency();
        this.dataSource = new MatTableDataSource<Currency>(this.allCurrency);
      }, 250);
    } else {
      this.dataSource = new MatTableDataSource<Currency>([]);
      setTimeout(() => {
        this.dataSource = new MatTableDataSource<Currency>(this.allCurrency);
        this.getAllCurrency();
      }, 250);
    }
  }
}

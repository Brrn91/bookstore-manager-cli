export type LoanStatus = "ATIVO" | "DEVOLVIDO";

export class Loan {
  bookId: number;
  clientId: number;
  dueDate: string;
  status: LoanStatus;
  loanDate?: string;
  returnDate?: string;
  id?: number;

  constructor(
    bookId: number,
    clientId: number,
    dueDate: string,
    status: LoanStatus = "ATIVO",
    loanDate?: string,
    returnDate?: string,
    id?: number,
  ) {
    this.bookId = bookId;
    this.clientId = clientId;
    this.dueDate = dueDate;
    this.status = status;
    this.loanDate = loanDate;
    this.returnDate = returnDate;
    this.id = id;
  }
}

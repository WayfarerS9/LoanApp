export interface Loan {
    loanID: number | null;
    creditorID: number | null;
    creditorData: string;
    debtorID: number | null;
    debtorData: string;
    amount: number;
    date: string;
    foot: string;
    addInf: string; 
};


export interface ISendReceiptEmail {
    to: string;
    subject: string;
    html: string;
    billNumber?: string;
}

export class SSD {
    id: number = 0;
    name: string = '';
    sku: string = '';
    warranty: string = '';
    picture?: Uint8Array; // Ez az oszlop típusa BLOB
    discount: boolean = false;
}
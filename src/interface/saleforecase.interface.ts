
export interface MApiGetSale {

}
export type User = {
    my: string;
    vender: string;
    part: string;
    diameter: string;
    pltype: string;
};
export interface MSale {
    [key: string]: any;
    ym: string;
    customer: string;
    modelName: string;
    modelCode: string;
    diameter: string;
    pltype: string;
    d01: number;
    d02: number;
    d03: number;
    d04: number;
    d05: number;
    d06: number;
    d07: number;
    d08: number;
    d09: number;
    d10: number;
    d11: number;
    d12: number;
    d13: number;
    d14: number;
    d15: number;
    d16: number;
    d17: number;
    d18: number;
    d19: number;
    d20: number;
    d21: number;
    d22: number;
    d23: number;
    d24: number;
    d25: number;
    d26: number;
    d27: number;
    d28: number;
    d29: number;
    d30: number;
    d31: number;
}

export interface MFilterSale {
    text: string;
    value: string[];
    sort: string;
    type: string; // text,select
}
export interface MDialogFilter {
    open: boolean;
    close?: any;
    column: string;
    year: string;
}

export interface MReduxSale {
    filter: MFilterSale[];
}
export interface MChoose {
    key: string;
    value: string;
    checked?: boolean;
}
export interface MGetSale {
    status: string;
    data: MSale[];
}

export interface MMasterFilter {
    column: string;
    field: string;
}

export interface MUpdateSale {
    empcode: string;
    year: string;
    sales: MSale[];
}
export interface MDistribution {
    year: string;
    empcode: string;
}
export interface DictMstr {
    dictId?: string;
    dictSystem?: string | null;
    dictType?: string | null;
    code?: string;
    description?: string | null;
    refCode?: string;
    note?: string | null;
    createDate?: string;
    updateDate?: string;
    dictStatus?: string | null;
}

export interface Status {
    status:boolean;
    message:string;
}
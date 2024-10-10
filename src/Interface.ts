export interface MSale {
    ym?: string;
    empcode?: string;
    listSale?: Person[];
    year?: string;
    month?: string;
    customer?: string;
    model?: string;
    modelCode?: string;
    data?: Person[];
    filterCustomer?: MFitlerEdit[];
    filterSBU?: MFitlerEdit[];
}
export interface MResponse {
    status: boolean;
    error: string;
    name?: string;
}
export interface MLogin {
    pren: string;
    name: string;
    fullName: string;
    empcode: string;
    dvcd: string;
    status: boolean;
}
export interface MFilter {
    customer?: string;
    model?: string;
    modelCode?: string;
    sebango?: string;
    pltype?: string;
}
export interface Person {
    [key: string]: any;
    customer: string;
    modelName: string;
    sebango: string;
    modelGroup: string;
    pltype: string;
    total: number;
    d01: string | number;
    d02: string | number;
    d03: string | number;
    d04: string | number;
    d05: string | number;
    d06: string | number;
    d07: string | number;
    d08: string | number;
    d09: string | number;
    d10: string | number;
    d11: string | number;
    d12: string | number;
    d13: string | number;
    d14: string | number;
    d15: string | number;
    d16: string | number;
    d17: string | number;
    d18: string | number;
    d19: string | number;
    d20: string | number;
    d21: string | number;
    d22: string | number;
    d23: string | number;
    d24: string | number;
    d25: string | number;
    d26: string | number;
    d27: string | number;
    d28: string | number;
    d29: string | number;
    d30: string | number;
    d31: string | number;
    id?: number;
    ym?: string;
}


export interface MStatusSale {
    year?: string;
    month?: string;
    rev?: number;
    dt?: string;
    isDistribution?: boolean;
}

export interface MCustomer {
    customerCode: string;
    customerName: string;
    customerNameShort: string;
    shipCode: null | string;
    address1: null | string;
    address2: null | string;
    address3: null | string;
    country: null | string;
}

export interface MModel {
    modelCode: string;
    model: string;
    modelType: string;
    modelGroup: string;
    line: number;
    status: string;
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
    capacity: null;
    rmk1: string;
    rmk2: string;
    rmk3: string;
    rmk4: string;
    rmk5: null;
    rmk6: null;
    rmk7: null;
    rmk8: null;
    rmk9: string;
    rmk10: string;
}

export interface MGetSale {
    data: Person[];
    customer: MCustomer[];
    model: MModel[];
    modelName: string;
}

export interface MRedux {
    reducer: {
        login: false,
        username: '',
        empcode: '',
        name: '',
        dvcd: '',
        select: {
            year: '',
            month: '',
            distribution: false
        },
        menuActive: "",
        filterCustomer: [],
        filterSBU: [],
        rev: 0,
        privilege: MDCIPrivilege[],
    }
}

// export interface MLogin {
//     empcode?: string;
// }

export interface MFitlerEdit {
    value: string | number;
    label: string
}
export interface MReactSelect {
    value: string;
    label: string;
}
export interface MDCIPrivilege {
    privId: number;
    privModule: string;
    privComponent: string;
    privAction: string;
    privRef: string;
    privVal: string;
    privStatus: string;
    privCreateDate: Date;
    privUpdateDate: Date;
}
export interface MDeliveryControl {
    customer: string;
    modelName: string;
    sebango: string;
    modelGroup: string;
    pltype: string;
    total: number;
    d01: string | number;
    d02: string | number;
    d03: string | number;
    d04: string | number;
    d05: string | number;
    d06: string | number;
    d07: string | number;
    d08: string | number;
    d09: string | number;
    d10: string | number;
    d11: string | number;
    d12: string | number;
    d13: string | number;
    d14: string | number;
    d15: string | number;
    d16: string | number;
    d17: string | number;
    d18: string | number;
    d19: string | number;
    d20: string | number;
    d21: string | number;
    d22: string | number;
    d23: string | number;
    d24: string | number;
    d25: string | number;
    d26: string | number;
    d27: string | number;
    d28: string | number;
    d29: string | number;
    d30: string | number;
    d31: string | number;
    id?: number;
    ym?: string;
}


export interface oSale {
    customer: string;
    modelName: string;
    sebango: string;
    modelGroup: string;
    pltype: string;
    total: number;
    d01: string | number;
    d02: string | number;
    d03: string | number;
    d04: string | number;
    d05: string | number;
    d06: string | number;
    d07: string | number;
    d08: string | number;
    d09: string | number;
    d10: string | number;
    d11: string | number;
    d12: string | number;
    d13: string | number;
    d14: string | number;
    d15: string | number;
    d16: string | number;
    d17: string | number;
    d18: string | number;
    d19: string | number;
    d20: string | number;
    d21: string | number;
    d22: string | number;
    d23: string | number;
    d24: string | number;
    d25: string | number;
    d26: string | number;
    d27: string | number;
    d28: string | number;
    d29: string | number;
    d30: string | number;
    d31: string | number;
    id?: number;
    ym?: string;
}

export interface PropsCustomer {
    VenderCode: string;
    VenderName: string;
    VenderShortName: string;
    VenderAddress: string;
    VenderNation: string;
    VenderTel: string;
    CreateBy: string;
    CreateDT: Date;
    UpdateBy: string;
    UpdateDT: Date;
    VenderActive: string;
}
export interface PropsPallet {
    MODEL: string;
    PLTYPE: string;
    ACTIVE: string;
    CUSTOMER_CODE?: string;
    CUSTOMER_SHORT_NAME?: string;
}

export interface PropsStatus {
    status: boolean;
    message: string;
}
export interface ParamDelectModelOfCustomer {
    dictId: string;
    custShortName: string;
}
export interface PropSummarySale {
    sum1YC: ItemSummarySale;
    sum2YC: ItemSummarySale;
    sumSCR: ItemSummarySale;
    sumODM: ItemSummarySale;
    sumTotal: ItemSummarySale;
}
export interface ItemSummarySale {
    text: string;
    value: number;
}
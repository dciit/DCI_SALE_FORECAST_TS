export interface MRedux {
    login?: boolean;
    name?: string;
    sure?: string;
    code?: string;
}
export interface MLogout {
    open: boolean;
    close: any;
}
export interface MReduxCore {
    login: boolean;
}
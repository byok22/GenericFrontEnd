import { BasicKpi } from "../../../interfaces/basic-kpi.interface";
import { GenericTableConfig } from "../interfaces/generic-table-config";
import { TableColumn } from "../interfaces/table-column";
import { IBuilderGenericTable } from "./builder-generic-table.interface";


export class GenericTableConcretBuilder<T> implements IBuilderGenericTable<T> {
    _genericTable!: GenericTableConfig<T>;

    constructor() {
        this.Reset();
    }

    Reset = (): void => {
        this._genericTable = {
            title: "",
            dataKey: "",
            data: [],
            kpi: [],
            pagination: false,
            rowsPerPage: 10,
            rowsPerPageOptions: [],
            columns: [],
            globalFilterFields: [],
            groupby: ""
        };
    };

    SetTitle = (title: string): void => {
        this._genericTable.title = title;
    };

    SetDataKey = (dataKey: string): void => {
        this._genericTable.dataKey = dataKey;
    };

    SetData = (data: T[]): void => {
        this._genericTable.data = data;
    };

    SetKpis = (kpi: BasicKpi[]): void => {
        this._genericTable.kpi = kpi;
    };

    SetPagination = (pagination: boolean): void => {
        this._genericTable.pagination = pagination;
    };

    SetRowsPerPage = (rowsPerPage: number): void => {
        this._genericTable.rowsPerPage = rowsPerPage;
    };

    SetRowsPerPageOptions = (rowsPerPageOptions: number[]): void => {
        this._genericTable.rowsPerPageOptions = rowsPerPageOptions;
    };

    SetColumns = (columns: TableColumn[]): void => {
        this._genericTable.columns = columns;
    };

    SetGlobalFilterFields = (globalFilterFields: string[]): void => {
        this._genericTable.globalFilterFields = globalFilterFields;
    };

    SetGroupBy = (groupby: string): void => {
        this._genericTable.groupby = groupby;
    };

    Generate = (): GenericTableConfig<T> => {
        const result = this._genericTable;
        this.Reset();
        return result;
    };
    
    GetTable = (): GenericTableConfig<T> => {
        return this._genericTable;
    };
}

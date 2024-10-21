import { useRef } from 'react';
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Column, DefaultCellTypes, Row } from "@silevis/reactgrid";
import { Button } from 'antd';
interface MExcelProps {
    year: string;
    month: string;
    rows: Row<DefaultCellTypes>[],
    column: Column[]
}
function ExportToExcel(props: MExcelProps) {
    const { year, month, rows, column } = props;
    const tableRef = useRef(null);
    var ExcelName = '';
    ExcelName = `SALE-FORECAST-${year}-${month}`;
    console.log('first')
    return <>
        <DownloadTableExcel
            filename={ExcelName}
            sheet={`${year}-${month}`}
            currentTableRef={tableRef.current}
        >
            <Button  color='success'  >Excel</Button>
        </DownloadTableExcel>
        <table ref={tableRef} className="hidden">
            <tbody>
                <tr>
                    {
                        column.map((oCol: Column, iCol: number) => {
                            return <td key={iCol}>{oCol.columnId.toString().toUpperCase()}</td>
                        })
                    }
                </tr>
                {
                    rows.map((oRow: Row<DefaultCellTypes>, iRow: number) => {
                        return oRow.rowId == 'header' ? null : <tr key={iRow}>
                            {
                                oRow.rowId != 'header' ? oRow.cells.map((oCell: any, iCell: number) => {
                                    return <td key={iCell}>{oCell?.text}</td>
                                }) : ''
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
}
export default ExportToExcel;
import "../styles/simpleTable.css";
import { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";

// {
//     "id": 997,
//     "name": "Sybila",
//     "last_name": "Duester",
//     "email": "sduesterro@ftc.gov",
//     "country": "Chile",
//     "dateofbyr": "10/6/2023",
//     "comment": null,
//     "description": null
// },

function SmpleTable({ data, columns }) {
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // cambia el estado para ordenar
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    return (
        <div>
            <input
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
            />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    key={column.id}
                                    onClick={column.column.getToggleSortingHandler()}>
                                    {flexRender(
                                        column.column.columnDef.header,
                                        column.getContext()
                                    )}

                                    {
                                        // Ordena segun la columna
                                        { asc: "▲", desc: "▼" }[
                                            column.column.getIsSorted() ?? null
                                        ]
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {
                        // Render the footer
                        table.getFooterGroups().map((group) => (
                            <tr key={group.id}>
                                {group.headers.map((column) => (
                                    <th key={column.id}>
                                        {flexRender(
                                            column.column.columnDef.footer,
                                            column.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))
                    }
                </tfoot>
            </table>
            <button onClick={() => table.setPageIndex(0)}>Primer Pagina</button>
            <button onClick={() => table.previousPage()}>
                Anterior Pagina
            </button>
            <button onClick={() => table.nextPage()}>Siguiente Pagina</button>
            <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                Ultima Pagina
            </button>
        </div>
    );
}

export default SmpleTable;

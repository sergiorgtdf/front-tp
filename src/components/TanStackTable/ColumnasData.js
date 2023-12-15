import dayjs from "dayjs";
export const columns = [
    {
        header: "ID",
        accessorKey: "id",
        footer: "Mi ID",
    },
    {
        header: "Nombre y Apellido",
        accessorFn: (row) => `${row.name} ${row.last_name}`,
        footer: "Mi Nombre y Apellido",
    },
    // {
    //     header: "Nombre",
    //     accessorKey: "name",
    //     footer: "Mi Nombre",
    // },
    // {
    //     header: "Apellido",
    //     accessorKey: "last_name",
    //     footer: "Mi Apellido",
    // },
    {
        header: "Email",
        accessorKey: "email",
        footer: "Mi Email",
    },
    {
        header: "Pais",
        accessorKey: "country",
        footer: "Mi Pais",
    },
    {
        header: "Fecha de Nacimiento",
        accessorKey: "dateofbyr",
        footer: "Mi Fecha de Nacimiento",
        cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
    },
    {
        header: "Comentario",
        accessorKey: "comment",
        footer: "Mi Comentario",
    },
    {
        header: "Descripcion",
        accessorKey: "description",
        footer: "Mi Descripcion",
    },
];

export default columns;

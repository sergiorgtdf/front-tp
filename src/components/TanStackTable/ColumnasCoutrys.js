import dayjs from "dayjs";
export const columns = [
    {
        header: "ID",
        accessorKey: "id",
        footer: "ID",
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
        header: "Pais",
        accessorKey: "country",
        footer: "Pais",
    },
    {
        header: "Codigo Pais",
        accessorKey: "countrycode",
        footer: "Codigo Pais",
    },
    {
        header: "Email",
        accessorKey: "email",
        footer: "Mi Email",
    },
    {
        header: "Acciones",
        accessorKey: "actions",
        footer: "Acciones",
    },
];

export default columns;

import Swal from "sweetalert2";

const mensaje = (mensaje, icono, i) => {
    Swal.fire({
        position: "top-end",
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    });
};

exort default mensaje;
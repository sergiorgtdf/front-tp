import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { usePost } from "../../context/postContext";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import "../../styles/LoginStyles.css";
import "./profile.css";

import toast from "react-hot-toast";
export const ProfilePg = () => {
    const { user } = useAuth();
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();

    {
        JSON.stringify(user, null, 3);
    }
    // Efecto para que se redirecciones
    useEffect(() => {
        if (!user) {
            navigate("/");
        } else {
            setValue("username", user.username);
            setValue("email", user.email);
        }
    }, [user]);

    // Funcion para enviar los datos del formulario
    const onSubmit = handleSubmit((value) => {
        // if (!errors.username || !errors.email || !errors.password) {
        //     createUser(value);
        // }
        toast.success("Datos actualizados");
    });
    return (
        <>
            {/* {JSON.stringify(user, null, 3)} */}

            <>
                <div className="accountInfo">
                    <div className="Titu">
                        <h1 className="Titu">Mi Cuenta</h1>
                    </div>
                    <div className="contenedorInfo">
                        <div className="imagen">
                            <img src={user.imageURL} alt="" />
                        </div>{" "}
                        <form>
                            <div className="inputBox">
                                <input
                                    id="username"
                                    type="username"
                                    name="username"
                                    required=""
                                    placeholder=" "
                                    {...register("username", {
                                        required: true,
                                    })}
                                />
                                {errors.email && (
                                    <p className="errores">
                                        El Nombre de usuario es requerido
                                    </p>
                                )}

                                <label id="username">Nombre de Usuario </label>
                            </div>

                            <div className="inputBox">
                                <input
                                    type="email"
                                    name="email"
                                    required=""
                                    placeholder=" "
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <p className="errores">
                                        El Email es requerido
                                    </p>
                                )}

                                <label>E-mail </label>
                            </div>
                            <div className="inputBox">
                                <input
                                    type="password"
                                    name="pasword"
                                    required=""
                                    placeholder=" "
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                {errors.password && (
                                    <p className="errores">
                                        El Password es requerido
                                    </p>
                                )}

                                <label>Password</label>
                            </div>

                            <button onClick={onSubmit} className="Boton-enviar">
                                Enviar
                            </button>
                        </form>{" "}
                    </div>
                    <Toaster />
                </div>
            </>
        </>
    );
};
export default ProfilePg;

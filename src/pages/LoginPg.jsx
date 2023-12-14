import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import "../styles/LoginStyles.css";
import { Toaster, toast } from "react-hot-toast";

const LoginPg = () => {
    const { login, isAuth, errorsBack } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Efecto para que se redirecciones
    const navigate = useNavigate();

    // Si el usuario esta autenticado lo redirecciona a la pagina de blog
    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth]);

    // Funcion para enviar los datos del formulario
    const onSubmit = handleSubmit((value) => {
        if (!errors.email || !errors.password) {
            const { res } = login(value);
            if (res) {
                toast.success("Bienvenido");
                // localStorage.setItem("token", res.token);
                // localStorage.setItem("user", JSON.stringify(res.user));
            }
        }
    });

    return (
        <div className="contenedorLogin">
            <div className="box">
                <div id="logo" className="logo-Pg" title="Task">
                    <i className="fa-solid fa-blog fa-2xl"></i>

                    {/* <img src="" height="50px" alt="" /> */}
                </div>
                <h2>Login</h2>
                <p>Ingrese con sus credenciales</p>

                {errorsBack.map((error, index) => (
                    <p key={index} className="errores">
                        {error.data}
                    </p>
                ))}
                <form>
                    <div className="inputBox">
                        <input
                            type="email"
                            name="email"
                            required=""
                            placeholder=" "
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <p className="errores">El Email es requerido</p>
                        )}

                        <label>E-mail </label>
                    </div>
                    <div className="inputBox">
                        <input
                            type="password"
                            name="pasword"
                            required=""
                            placeholder=" "
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <p className="errores">El Password es requerido</p>
                        )}

                        <label>Password</label>
                    </div>
                    <div className="forgot">
                        <button type="button">
                            <p>
                                <Link to="/register">No tengo una cuenta</Link>
                            </p>
                        </button>
                    </div>
                    <button onClick={onSubmit} className="Boton-enviar">
                        Enviar
                    </button>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default LoginPg;

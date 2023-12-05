import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import "../styles/LoginStyles.css";

const LoginPg = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { login, isAuth, errorBack } = useAuth();

    // Efecto para que se redirecciones
    const navigate = useNavigate();

    // Si el usuario esta autenticado lo redirecciona a la pagina de blog
    useEffect(() => {
        if (isAuth) navigate("/blog");
    }, [isAuth]);

    // Funcion para enviar los datos del formulario
    const onSubmit = handleSubmit((value) => {
        login(value);
    });

    return (
        <div className="contenedorLogin">
            <div className="box">
                <div id="logo" className="logo-Pg" title="Task">
                    <img src="../../img/task.svg" height="50px" alt="" />
                </div>
                <h2>Login</h2>
                <p>Ingrese con sus credenciales</p>
                {errorBack.map((err, i) => (
                    <div key={i} className="bg-red-800 text-white">
                        {err}
                    </div>
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
                            <p className="text-red-400">
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
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <p className="text-red-400">
                                El Password es requerido
                            </p>
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
        </div>
    );
};

export default LoginPg;

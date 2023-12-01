import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import { useAuth } from "../../context/AuthContext";

export const RegisterPg = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    const { signup, isAuth, errorBack } = useAuth();

    // Efecto para que se redirecciones
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate("/task");
    }, [isAuth]);

    //TODO: Borrar Mensaje error
    useEffect(() => {
        setTimeout(() => {
            errorBack.length = 0;
        }, 3000);
    }, [errorBack]);

    const onSubmit = handleSubmit(async (value) => {
        // conexion al servidor y envia al usuario
        // console.log(value);
        // const respuesta = await registerRequest(value);
        // console.log(respuesta);
        // Viene del context
        signup(value);
    });

    return (
        <div className="box">
            <div id="logo" className="logo-Pg" title="task">
                <img src="../../img/task.svg" height="50px" alt="" />
            </div>
            <h2>Register</h2>
            <p>Registrese para poder acceder</p>
            <form>
                {errorBack.map((err, i) => (
                    <div key={i} className="ErrLogin">
                        {err}
                    </div>
                ))}
                <div className="inputBox">
                    <input
                        type="text"
                        name="username"
                        required=""
                        placeholder=" "
                        {...register("username", { required: true })}
                    />

                    <label>Username </label>
                </div>

                <div className="inputBox">
                    <input
                        type="email"
                        name="email"
                        required=""
                        placeholder=" "
                        {...register("email", { required: true })}
                    />
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
                    <label>Password</label>
                </div>

                <div className="forgot">
                    <button type="button">
                        <p>
                            <Link to="/login">Ya tengo una cuenta</Link>
                        </p>
                    </button>
                </div>
                <button onClick={onSubmit} className="Boton-enviar">
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default RegisterPg;

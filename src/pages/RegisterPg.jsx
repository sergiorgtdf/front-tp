import "../styles/LoginStyles.css";

import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const RegisterPg = () => {
    const { createUser, isAuth, errors: registerErrors } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Efecto para que se redirecciones
    const navigate = useNavigate();

    const onSubmit = (value) => {
        createUser(value);
    };

    useEffect(() => {
        if (isAuth) navigate("/tasks");
    }, [isAuth]);

    return (
        <div className="box">
            <div id="logo" className="logo-Pg" title="task">
                <img src="../../img/task.svg" height="50px" alt="" />
            </div>
            <h2>Register</h2>

            <p>Registrese para poder acceder</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="inputBox">
                    <input
                        type="text"
                        name="username"
                        required=""
                        placeholder=" "
                        {...register("username", { required: true })}
                        autoFocus
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

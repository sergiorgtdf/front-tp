import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./style.css";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPg = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    const { signin, isAuth, errorBack } = useAuth();

    // Efecto para que se redirecciones
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate("/task");
    }, [isAuth]);

    const onSubmit = handleSubmit(async (value) => {
        signin(value);
    });

    return (
        <div className="box">
            <div id="logo" className="logo-Pg" title="Task">
                <img src="../../img/task.svg" height="50px" alt="" />
            </div>
            <h2>Login</h2>
            <p>Ingrese con sus credenciales</p>
            <form>
                {errorBack.map((err, i) => (
                    <div key={i} className="ErrLogin">
                        {err}
                    </div>
                ))}
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
                            <Link to="/register">No tengo una cuenta</Link>
                        </p>
                    </button>
                </div>
                <button onClick={onSubmit} className="Boton-enviar">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default LoginPg;

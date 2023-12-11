import { useForm } from "react-hook-form";
import "./textBox.css";
const TextBox = ({ label, value, onChange, ...props }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <div className="inputBox">
            <input
                type="email"
                name="email"
                required=""
                placeholder=" "
                {...register("email", { required: true })}
            />
            {errors.Type && <p className="errores">El campo es requerido</p>}

            <label>E-mail </label>
        </div>
    );
};

export default TextBox;

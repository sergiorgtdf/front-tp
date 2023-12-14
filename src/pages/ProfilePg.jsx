import TextBox from "../components/UI/TextBox/TextBox";
import { useAuth } from "../context/authContext";
export const ProfilePg = () => {
    const { user } = useAuth();
    return (
        <>
            <div>Profile</div>
            {JSON.stringify(user, null, 3)}

            <>
                <section className="accountInfo">
                    <div className="contenedor">
                        <div className="accountInfo__container">
                            <div className="accountInfo__container--img">
                                <img src="" alt="" />
                            </div>
                            <div className="accountInfo__container--info">
                                <h2>Nombre de Usuario: </h2>
                                <p>Correo</p>
                                <p>Telefono</p>
                                <p>Fecha de nacimiento</p>
                                <p>Genero</p>
                                <p>País</p>
                                <p>Estado</p>
                                <p>Ciudad</p>
                                <p>Biografía</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </>
    );
};
export default ProfilePg;

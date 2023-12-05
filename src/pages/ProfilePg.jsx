import { useAuth } from "../context/authContext";
export const ProfilePg = () => {
    const { user } = useAuth();
    return (
        <>
            <div>Profile</div>
            {JSON.stringify(user, null, 3)}
        </>
    );
};
export default ProfilePg;

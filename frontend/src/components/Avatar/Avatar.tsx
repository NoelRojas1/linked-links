import type {AuthUser} from "../../store/useAuthStore.ts";

interface AvatarProps {
    authUser: AuthUser | null;
}

export default function Avatar({authUser}: AvatarProps) {
    return (
        <div className="avatar">
            {
                authUser?.bgImage ? (
                    <img src={authUser.bgImage} alt="Avatar"/>
                ) : (
                    <span>{authUser?.username.slice(0,2).toUpperCase()}</span>
                )
            }
        </div>
    )
}
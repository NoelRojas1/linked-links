import './cta-form.css';
import {useState} from "react";
import * as React from "react";
import {useNavigate} from "react-router";
import {useAuthStore} from "../../../store/useAuthStore.ts";
import toast from "react-hot-toast";

export default function CTAForm({ctaText}: {ctaText: string}) {
    const checkUsernameAvailability = useAuthStore(state => state.checkUsernameAvailability);
    const navigator = useNavigate();
    const [username, setUsername] = useState('');

    const isUsernameAvailability = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { taken } = await checkUsernameAvailability(username);

        if (!taken) {
            navigator('/register', {
                state: {claimedUsername: username},
            });
            return;
        }

        toast.error(`Username "${username}" not available`);
        setUsername('');
    }

    return (
        <form
            className="cta-form"
            onSubmit={isUsernameAvailability}
        >
            <label>
                <span>linkedlinks/@</span>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <button>{ctaText}</button>
        </form>
    )
}
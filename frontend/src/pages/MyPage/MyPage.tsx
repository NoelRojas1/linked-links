import './mypage.css';
import {useLocation} from "react-router";
import Avatar from "../../components/Avatar/Avatar.tsx";
import {type AuthUser, useAuthStore} from "../../store/useAuthStore.ts";
import {useState} from "react";
import {IoColorPalette} from "react-icons/io5";
import {FaImage, FaSave} from "react-icons/fa";
import * as React from "react";
import {useUserStore} from "../../store/useUserStore.ts";

export default function MyPage() {
    const user = useAuthStore(state => state.authUser);
    const location = useLocation();

    const username = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    // Get information about username

    return (
        <div className="my-page_container">
            {/* Hero/Account Setting */}
            <BgTypeForm user={user!} />


            {/* Form for links */}
        </div>
    )
}

function BgTypeForm({user}: {user: AuthUser}) {
    const updateUserInfo = useUserStore(state => state.updateUserInfo);
    const [bgType, setBgType] = useState(user.bgType || "color");
    const [userInfo, setUserInfo] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        location: user.location || "",
        bgColor: user.bgColor || "#AA3BFF",
    });

    const handleUpdateUserInfo = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUserInfo({
            ...userInfo, bgType
        });
    }

    return (
        <form className="bg-type_form" onSubmit={handleUpdateUserInfo}>
            <div className="bg-type_form__cover" data-bg-color={userInfo.bgColor}>
                <div className="bg-type_form__togglers">
                    <label className="">
                        <input
                            type="radio"
                            name="bg-type"
                            value="color"
                            checked={bgType === "color"}
                            onChange={(e) => setBgType(e.target.value)}
                        />
                        <div className="toggle-btn">
                            <IoColorPalette />
                            <span>Color</span>
                        </div>
                    </label>
                    <label className="">
                        <input
                            type="radio"
                            name="bg-type"
                            value="image"
                            checked={bgType === "image"}
                            onChange={(e) => setBgType(e.target.value)}
                        />
                        <div className="toggle-btn">
                            <FaImage />
                            <span>Image</span>
                        </div>
                    </label>
                </div>
                <div className="bg-type_form__pickers">
                    {bgType === "color" && <>
                        <label htmlFor="color-picker">Background Color</label>
                        <input
                            type="color"
                            value={userInfo.bgColor}
                            id="color-picker"
                            onChange={(e) => setUserInfo(prev => ({
                            ...prev,
                            bgColor: e.target.value,
                        }))} />
                    </>}
                    {bgType === "image" && <h2>Nothing yet</h2>}

                </div>
            </div>

            <div className="bg-type_form__avatar">
                <Avatar authUser={user} />
            </div>

            <div className="bg-type_form__inputs">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    value={userInfo.firstName}
                    placeholder="This is your First Name"
                    onChange={(e) => setUserInfo(prev => ({
                        ...prev,
                        firstName: e.target.value,
                    }))}
                />

                <label htmlFor="lastName">First Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={userInfo.lastName}
                    placeholder="This is your Last Name"
                    onChange={(e) => setUserInfo(prev => ({
                        ...prev,
                        lastName: e.target.value,
                    }))}
                />

                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    value={userInfo.location}
                    placeholder="Add a location"
                    onChange={(e) => setUserInfo(prev => ({
                        ...prev,
                        location: e.target.value,
                    }))}
                />

                <label htmlFor="bio">Bio</label>
                <textarea
                    value={userInfo.bio}
                    placeholder="Your bio description goes here..."
                    id="bio"
                    onChange={(e) => setUserInfo(prev => ({
                        ...prev,
                        bio: e.target.value,
                    }))}
                />

                {/*  Submit button  */}
                <button className="bg-btn save-btn" type="submit">
                    <FaSave />
                    <span>Save</span>
                </button>
            </div>
        </form>
    )
}
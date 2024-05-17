import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Avatar {
    high: string;
}

interface ProfileData {
    name: string;
    email: string;
    avatar: Avatar;
}

const Home = () => {
    const navigate = useNavigate();
    const token = window.localStorage.getItem('jwt')

    useEffect(() => {
        if (token == null) {
            navigate('/');
        }

        const handleGetProfile = async () => {
            const response = await fetch('https://api.homologation.cliqdrive.com.br/auth/profile/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json;version=v1_web',
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const data = await response.json();
                setProfileData(data);
                console.log(data);
                console.log(profileData)
            }
        }

        handleGetProfile();
    }, []);


    const [profileData, setProfileData] = useState<ProfileData | null>(null);




    return (
        <div>
            {profileData ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div id="profile" className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl rounded-2xl">

                        <div className="flex justify-end">
                            <button id="log-out" className="bg-red-600" onClick={
                                () => { window.localStorage.removeItem('jwt'); navigate('/') }}>
                                <p className="text-white"><b>Log out</b></p>
                            </button>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-center">Profile picture</p>
                            <div className="flex items-center justify-center">
                                <img id='profilepic' src={profileData.avatar.high} alt="Profile picture" />    
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <p>Your <b>Name</b></p>
                            <div className="dados flex items-center"><p>{profileData.name}</p></div>
                        </div>

                        <div>
                            <div className="flex flex-col">
                                <p>Your <b>E-mail</b></p>
                                <div className="dados flex items-center"><p>{profileData.email}</p></div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-screen">
                    <h1 className="text-2xl azul">Carregando...</h1>
                </div>
            )}
        </div>
    )

}

export default Home;
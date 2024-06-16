import { useNavigate } from 'react-router-dom'

import {Page, PersonalInformation} from '@/components'
import {useMeQuery} from "@/services/auth/auth.service";


export const ProfilePage = () => {
    const { data } = useMeQuery()

    const navigate = useNavigate()


    const onAvatarChange = () => {
        navigate('/login')
    }

    const handleLogout = () => {
        navigate('/login')
    }

    const onNameChange = () => {
        navigate('/login')
    }

    return (
        <Page>
            <PersonalInformation
                avatar={data?.avatar}
                email={data?.email}
                onLogout={handleLogout}
                onAvatarChange={onAvatarChange}
                onNameChange={onNameChange}
                name={data?.name}
            />
        </Page>
    )
}

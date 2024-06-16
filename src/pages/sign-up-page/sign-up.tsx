

import { Page, SignUp} from '@/components'


import { SignUpBody} from "@/services/auth/auth.types";
import {useSignUpMutation} from "@/services/auth/auth.service";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";



export const SignUpPage = () => {
    const [signUp] = useSignUpMutation()
    const navigate = useNavigate()

    const handleSignUp = async (data: SignUpBody) => {
        try {
            await signUp(data).unwrap()
            navigate('/')
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data?.message ?? 'Could not sign up')
        }
    }

    return (
        <Page>
            <SignUp onSubmit={handleSignUp}   />
        </Page>
    )
}
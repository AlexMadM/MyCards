import { useLocation } from 'react-router-dom'

import { CheckEmail } from '@/components/auth/check-email'
import { FormWrapper } from '@/components/common/form-wrapper'

export const CheckEmailPage = () => {
  const location = useLocation()
  const email = location.state?.email

  return (
    <FormWrapper>
      <CheckEmail email={email} />
    </FormWrapper>
  )
}

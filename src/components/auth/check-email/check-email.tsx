import { Button, Card, Typography } from '@/components'

import s from './check-email.module.scss'

import { Email } from '../../../assets/icons'
type Props = {
  email: string
}

export const CheckEmail = ({ email }: Props) => {
  const message = `We've sent an e-mail with instructions to ${email}`

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'large'}>
        Check your email
      </Typography>
      <div className={s.iconContainer}>
        <Email />
      </div>
      <Typography className={s.instructions} variant={'body2'}>
        {message}
      </Typography>
      <Button
        // as={Link}
        fullWidth
        // to={'/sing-in'}
      >
        Back to Sign in
      </Button>
    </Card>
  )
}

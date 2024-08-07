import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button, Card, ControlledTextField, Typography } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgot-password-form.module.scss'

type FormValues = z.infer<typeof emailSchema>
const emailSchema = z.object({
  email: z.string().email(),
})

type Props = {
  handlePasswordRecover: (data: FormValues) => void
}

export const ForgotPasswordForm = ({ handlePasswordRecover }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
  })

  const classNames = {
    card: s.card,
    instructions: s.instructions,
    link: s.link,
    question: s.question,
    title: s.title,
  }

  const onSubmit = (data: FormValues) => {
    handlePasswordRecover(data)
  }

  return (
    <Card className={classNames.card} onSubmit={handleSubmit(onSubmit)}>
      <Typography as={'h1'} className={classNames.title} variant={'h1'}>
        Forgot your password?
      </Typography>
      <ControlledTextField
        control={control}
        errorMessage={errors.email?.message}
        label={'Email'}
        name={'email'}
        placeholder={'example@gmail.com'}
      />
      <Typography className={classNames.instructions} variant={'body2'}>
        Enter your email address and we will send you further instructions
      </Typography>
      <Button fullWidth type={'submit'}>
        Send Instructions
      </Button>
      <Typography className={classNames.question} variant={'body2'}>
        Did you remember your password?
      </Typography>
      <div className={classNames.link}>
        <Link to={'/login'}> Try logging in</Link>
      </div>
    </Card>
  )
}

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button, Card, Typography } from '@/components'
import { ControlledTextField } from '@/components/control/controlled-text-field'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import s from './sign-up.module.scss'

const schema = z
  .object({
    email: z.string().email('Invalid email').nonempty('Enter email'),
    password: z.string().nonempty('Enter password'),
    passwordConfirmation: z.string().nonempty('Confirm your password'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

type FormType = z.infer<typeof schema>

type Props = {
  onSubmit: (data:FormType) => void

}
export const SignUp = (props: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })
  const handleFormSubmitted = handleSubmit(data =>
    props.onSubmit(data)
  )

  return (
    <>
      <Card>
        <Typography className={s.title} variant={'large'}>
          Sign Up
        </Typography>
        <form onSubmit={handleFormSubmitted}>
          <div className={s.form}>
            <ControlledTextField
              control={control}
              label={'Email'}
              name={'email'}
              placeholder={'Email'}
            />{' '}
            <ControlledTextField
              control={control}
              label={'Password'}
              name={'password'}
              placeholder={'Password'}
              type={'password'}
            />{' '}
            <ControlledTextField
              control={control}
              label={'Confirm password'}
              name={'passwordConfirmation'}
              placeholder={'Confirm password'}
              type={'password'}
            />
          </div>
          <Button className={s.button} fullWidth type={'submit'}>
            Sign Up
          </Button>
        </form>
        <Typography className={s.caption} variant={'body2'}>
          Already have an account?
        </Typography>
        <Typography as={Link} className={s.signInLink} to={'/login'} variant={'link1'}>
          Sign In
        </Typography>
      </Card>
    </>
  )
}

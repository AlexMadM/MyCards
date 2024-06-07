import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components'
import * as RadioG from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio.module.scss'

type Option = {
  label: string
  value: string
}

export type RadioGroupProps = {
  errorMessage?: string
  options: Option[]
} & Omit<ComponentPropsWithoutRef<typeof RadioG.Root>, 'children'>

export const RadioGroup = forwardRef<ElementRef<typeof RadioG.Root>, RadioGroupProps>(
  (props, ref) => {
    const { errorMessage, options, ...restProps } = props

    return (
      <RadioGroupRoot {...restProps} ref={ref}>
        {options.map(option => (
          <div className={s.label} key={option.value}>
            <RadioGroupItem id={option.value} value={option.value} />
            <Typography as={'label'} htmlFor={option.value} variant={'body2'}>
              {option.label}
            </Typography>
          </div>
        ))}
      </RadioGroupRoot>
    )
  }
)

export const RadioGroupRoot = forwardRef<
  ElementRef<typeof RadioG.Root>,
  ComponentPropsWithoutRef<typeof RadioG.Root>
>(({ className, ...props }, ref) => {
  return <RadioG.Root className={clsx(s.root, className)} {...props} ref={ref} />
})

export const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioG.Item>,
  ComponentPropsWithoutRef<typeof RadioG.Item>
>(({ children, className, ...props }, ref) => {
  return (
    <RadioG.Item className={clsx(s.option, className)} ref={ref} {...props}>
      <div className={s.icon}></div>
    </RadioG.Item>
  )
})

// import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
//
// import { RadioGroup, RadioGroupProps } from '@/components/ui/radio/radio'
//
// export type ControlledRadioGroupProps<TFieldValues extends FieldValues> = {
//   control: Control<TFieldValues>
//   name: FieldPath<TFieldValues>
// } & Omit<RadioGroupProps, 'id' | 'onChange' | 'value'>
//
// export const ControlledRadioGroup = <TFieldValues extends FieldValues>(
//   props: ControlledRadioGroupProps<TFieldValues>
// ) => {
//   const {
//     field: { onChange, ...field },
//     fieldState: { error },
//   } = useController({
//     control: props.control,
//     name: props.name,
//   })
//
//   return (
//     <RadioGroup
//       {...props}
//       {...field}
//       errorMessage={error?.message}
//       id={props.name}
//       onValueChange={onChange}
//     />
//   )
// }

import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components'

type RadioGroupFormProps<TFieldValues extends FieldValues> = Omit<
  RadioGroupProps,
  'id' | 'name' | 'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>

export const FormRadioGroup = <TFieldValues extends FieldValues = FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  ...rest
}: RadioGroupFormProps<TFieldValues>) => {
  const {
    field: { onChange, ref, value },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
  })

  return (
    <RadioGroup
      errorMessage={error?.message}
      onValueChange={onChange}
      ref={ref}
      value={value}
      {...rest}
    />
  )
}

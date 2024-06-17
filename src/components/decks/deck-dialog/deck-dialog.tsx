import { useForm } from 'react-hook-form'

import { ControlledCheckbox, ControlledTextField } from '@/components'
import { Dialog, DialogProps } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './deck-dialog.module.scss'
import {ChangeEvent, useState} from "react";

const newDeckSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3).max(5000),
})

type FormValues = z.infer<typeof newDeckSchema>

type Props = {
  defaultValues?: FormValues
  onConfirm: (data: { cover?: File | null } & FormValues) => void
} & Pick<DialogProps, 'onCancel' | 'onOpenChange' | 'open'>
export const DeckDialog = ({
  defaultValues = { isPrivate: false, name: '' },
  onCancel,
  onConfirm,
  ...dialogProps
}: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(newDeckSchema),
  })
  const [cover, setCover] = useState<File | null>(null)
  const onSubmit = handleSubmit(data => {
    onConfirm({...data, cover})
    dialogProps.onOpenChange?.(false)
    reset()
  })
  const handleCancel = () => {
    reset()
    onCancel?.()
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setCover(file)
    }
  }

  return (
    <Dialog {...dialogProps} onCancel={handleCancel} onConfirm={onSubmit} title={'Create new deck'}>
      <form className={s.content} onSubmit={onSubmit}>
        <input accept={'image/*'} onChange={uploadHandler} type={'file'}/>
        <ControlledTextField control={control} label={'Deck name'} name={'name'}/>
        <ControlledCheckbox
            control={control}
            label={'Private'}
            name={'isPrivate'}
            position={'left'}
        />
      </form>
    </Dialog>
  )
}

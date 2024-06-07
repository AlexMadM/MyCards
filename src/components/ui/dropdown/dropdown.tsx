import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropdown.module.scss'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ align = 'end', children, className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      align={align}
      className={clsx(s.content, className)}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    >
      <DropdownMenuPrimitive.Arrow asChild>
        <div className={s.arrow} />
      </DropdownMenuPrimitive.Arrow>
      <div className={s.itemsBox}>{children}</div>
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
))

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item className={clsx(s.item, className)} ref={ref} {...props} />
))

export const DropdownMenuGroup = DropdownMenuPrimitive.Group

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator className={clsx(s.separator, className)} ref={ref} {...props} />
))
export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label className={clsx(s.label, className)} ref={ref} {...props} />
))

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

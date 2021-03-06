import { HTMLAttributes } from 'react'

export interface NapProfileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick' | 'id'> {
  mode?: 'horizontal' | 'vertical'
  username?: string
  usernameWithAtSign?: boolean
  job?: string
  hasNap?: boolean
  opening?: boolean
  loading?: boolean
  seen?: boolean
  id: number
  onClick?: (id: number) => void
  profile?: string
  size?: number
  linked?: boolean
}

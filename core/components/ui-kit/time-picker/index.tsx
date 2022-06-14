import { FC } from 'react'
import * as Lib from './lib'
import { useRecoilValue } from 'recoil'
import { componentTimePickerAtoms } from '@/store/atomFamilies'
import { Layered } from '../layered'

export const DateTimePicker: FC<Lib.T.DateTimePickerProps> = ({
  // props
  storeKeys,
  maximumDate,
  onConfirm,
  dayEndIsMax,
  autoHideEarliest,
  onMinimumDateUpdate,
  updateMinimumDateEveryMinutes,
  closeOnConfirm = true,
  minimumDate: minimumDateProp,
}) => {
  const visibility = useRecoilValue(componentTimePickerAtoms.timePickerPopupVisibility(storeKeys.visibility))
  const { modalProps, layeredProps } = Lib.H.useDateTimePicker({ storeKeys, minimumDateProp, maximumDate, dayEndIsMax, updateMinimumDateEveryMinutes, onMinimumDateUpdate })

  return (
    <Lib.S.DateTimePicker visible={visibility} {...modalProps}>
      <Layered {...layeredProps}>
        <Lib.C.TimePicker storeKeys={storeKeys} maximumDate={maximumDate} dayEndIsMax={dayEndIsMax} />
        <Lib.C.DatePicker storeKeys={storeKeys} maximumDate={maximumDate} dayEndIsMax={dayEndIsMax} />
        <Lib.C.Actions closeOnConfirm={closeOnConfirm} onConfirm={onConfirm} storeKeys={storeKeys} autoHideEarliest={autoHideEarliest} />
      </Layered>
    </Lib.S.DateTimePicker>
  )
}

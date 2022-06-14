import * as Lib from '..'
import { IoAddCircleOutline, IoColorFilterOutline } from 'react-icons/io5'
import { AiOutlineRotateRight } from 'react-icons/ai'
import { useRecoilValue } from 'recoil'
import { pageCreateNapAtoms } from '@/store/atoms'

export const useToolsForReminderInserter = ({ boardRef }: Lib.T.ToolsForInserters) => {
  const Inserters = Lib.H.useInserters(boardRef)
  const { changeRotation, changeEffect } = Lib.H.useToolsForAllInserters({ boardRef })
  const activeItemID = useRecoilValue(pageCreateNapAtoms.activeItemID)
  const activeOption = useRecoilValue(pageCreateNapAtoms.activeOption)

  const tools: Pick<Lib.T.ToolProps, 'Icon' | 'type' | 'title' | 'disabled'>[] = [
    { Icon: IoColorFilterOutline, type: 'reminder-effect', title: 'Effect', disabled: activeOption !== 'reminder' || activeItemID === null },
    { Icon: AiOutlineRotateRight, type: 'reminder-rotation', title: 'Rotate', disabled: activeOption !== 'reminder' || activeItemID === null },
  ]

  const toolClick = (type: Lib.T.Tool) => {
    switch (type) {
      case 'reminder-effect': {
        changeEffect('REMINDER', '.reminder')
        break
      }

      case 'reminder-rotation': {
        changeRotation()
        break
      }
    }
  }

  return {
    get: {
      tools,
    },
    on: {
      toolClick,
    },
  }
}

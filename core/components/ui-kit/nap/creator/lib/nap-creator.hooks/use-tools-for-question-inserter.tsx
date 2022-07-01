import { pageCreateNapAtoms } from '@/store/atoms'
import { AiOutlineRotateRight } from 'react-icons/ai'
import { FaRegLightbulb } from 'react-icons/fa'
import { IoColorFilterOutline } from 'react-icons/io5'
import { useRecoilValue } from 'recoil'
import * as Lib from '..'

export const useToolsForQuestionInserter = ({ boardRef }: Lib.T.ToolsForInserters) => {
  const { getFocusedItem, changeRotation, changeEffect } = Lib.H.useToolsForAllInserters({
    boardRef,
  })
  const activeItemID = useRecoilValue(pageCreateNapAtoms.activeItemID)
  const activeOption = useRecoilValue(pageCreateNapAtoms.activeOption)
  const NapStorage = Lib.H.useNapStorage(boardRef)

  const tools: Pick<Lib.T.ToolProps, 'Icon' | 'type' | 'title' | 'disabled'>[] = [
    {
      Icon: FaRegLightbulb,
      type: 'question-hint',
      title: 'Toggle hint',
      disabled: activeOption !== 'question' || activeItemID === null,
    },
    {
      Icon: IoColorFilterOutline,
      type: 'question-effect',
      title: 'Effect',
      disabled: activeOption !== 'question' || activeItemID === null,
    },
    {
      Icon: AiOutlineRotateRight,
      type: 'question-rotation',
      title: 'Rotate',
      disabled: activeOption !== 'question' || activeItemID === null,
    },
  ]

  const toolClick = (type: Lib.T.Tool) => {
    switch (type) {
      case 'question-hint': {
        const focusedItem = getFocusedItem()
        if (!focusedItem) {
          return
        }

        const hint = focusedItem.querySelector('.hintSection') as HTMLParagraphElement | null
        if (!hint) {
          return
        }

        const { display } = window.getComputedStyle(hint)
        hint.style.display = display === 'block' ? 'none' : 'block'
        NapStorage.update(focusedItem)
        break
      }

      case 'question-effect': {
        changeEffect('QUESTION', '.question')
        break
      }

      case 'question-rotation': {
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

import { createNapAtoms } from '@/store/atoms'
import { useRecoilValue } from 'recoil'
import * as Lib from '../'

export const useToolsForAllInserters = ({ boardRef }: Pick<Lib.T.ToolsForInserters, 'boardRef'>) => {
  const activeItemID = useRecoilValue(createNapAtoms.activeItemID)

  /**
   *
   *
   *
   * finds the focused item
   */
  const getFocusedItem = (): HTMLDivElement | null => {
    if (!activeItemID) {
      return null
    }
    const { current: board } = boardRef
    if (!board) {
      return null
    }
    const id = '#'.concat(activeItemID)
    const focusedItem = board.querySelector(id) as HTMLDivElement | null
    return focusedItem
  }

  /**
   *
   *
   *
   * its one of the global tools for all inserters
   *  changes the focused item rotation
   */
  const changeRotation = () => {
    const focusedItem = getFocusedItem()
    if (!focusedItem) {
      return
    }

    const angle = parseInt(focusedItem.getAttribute('data-rotation') || '0') as Lib.T.Elements.ElementRotation
    const nextAngle = angle + 45
    focusedItem.style.transform = `rotate(${nextAngle}deg)`
    focusedItem.setAttribute('data-rotation', nextAngle.toString())
    focusedItem.focus()
  }

  /**
   *
   *
   *
   * changes the focused item style/effect
   *
   * @param effectGroup group name of styles/effects
   * @param queried sometimes we need to query the found focused item to achieve the actual element that has the effect/style className
   */
  const changeEffect = (effectGroup: keyof typeof Lib.CO.EFFECTS, queried?: string) => {
    const focusedItem = getFocusedItem()
    if (!focusedItem) {
      return
    }

    const actualItem = <HTMLDivElement | null>(queried ? focusedItem.querySelector(queried) : focusedItem)
    if (!actualItem) {
      return
    }

    const currentEffect = actualItem.className.split(' ').pop() as any
    const effectsRange = [0, Lib.CO.EFFECTS[effectGroup].length - 1]
    const currentEffectIndex = Lib.CO.EFFECTS[effectGroup].indexOf(currentEffect)
    const nextEffectIndex = currentEffectIndex + 1
    actualItem.classList.remove(currentEffect)
    actualItem.classList.add(nextEffectIndex > effectsRange[1] ? Lib.CO.EFFECTS[effectGroup][effectsRange[0]] : Lib.CO.EFFECTS[effectGroup][nextEffectIndex])
    actualItem.focus()
  }

  return {
    getFocusedItem,
    changeRotation,
    changeEffect,
  }
}

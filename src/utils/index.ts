export const getArrayBooleanByCurrentLayout = (currentLayout: string) => {
  if (currentLayout.includes('_')) {
    const arr = currentLayout.split('_')
    const len = arr.length || 0

    return Array(len).fill(false)
  }

  return Array(Number(currentLayout)).fill(false)
}

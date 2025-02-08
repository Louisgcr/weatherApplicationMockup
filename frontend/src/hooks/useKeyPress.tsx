import { useEffect, useState } from 'react'

/**
 * Custom hook that listens for a specific key press and returns whether the key is currently pressed.
 *
 * @param {string} targetKey - The key that the hook should listen for.
 * @returns {boolean} - A boolean value indicating whether the target key is currently pressed.
 *
 * @example
 * const isEnterPressed = useKeyPress('Enter');
 * console.log(isEnterPressed); // true if the Enter key is pressed, false otherwise
 *
 * @remarks
 * This hook adds event listeners for 'keydown' and 'keyup' events to the window object.
 * It cleans up the event listeners when the component using the hook is unmounted or when the targetKey changes.
 */

const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }

    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])

  return keyPressed
}

export default useKeyPress

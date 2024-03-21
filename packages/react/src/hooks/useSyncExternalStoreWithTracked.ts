'use client'

import { deepEqual } from '@wagmi/core/internal'
import { useRef } from 'react'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'

const isPlainObject = (obj: unknown) =>
  typeof obj === 'object' && !Array.isArray(obj)

export function useSyncExternalStoreWithTracked<
  snapshot extends selection,
  selection = snapshot,
>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => snapshot,
  getServerSnapshot: undefined | null | (() => snapshot) = getSnapshot,
  isEqual: (a: selection, b: selection) => boolean = deepEqual,
) {
  const trackedKeys = useRef<string[]>([])
  const result = useSyncExternalStoreWithSelector(
    subscribe,
    getSnapshot,
    getServerSnapshot,
    (x) => x,
    (a, b) => {
      if (isPlainObject(a) && isPlainObject(b) && trackedKeys.current.length) {
        for (const key of trackedKeys.current) {
          const equal = isEqual(
            (a as { [_a: string]: any })[key],
            (b as { [_b: string]: any })[key],
          )
          if (!equal) return false
        }
        return true
      }
      return isEqual(a, b)
    },
  )

  if (isPlainObject(result)) {
    const trackedResult = { ...result }
    Object.defineProperties(
      trackedResult,
      Object.entries(trackedResult as { [key: string]: any }).reduce(
        (res, [key, value]) => {
          return {
            ...res,
            [key]: {
              configurable: false,
              enumerable: true,
              get: () => {
                if (!trackedKeys.current.includes(key)) {
                  trackedKeys.current.push(key)
                }
                return value
              },
            },
          }
        },
        {},
      ),
    )
    return trackedResult
  }

  return result
}

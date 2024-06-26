import { expectTypeOf, test } from 'vitest'

import { useBalance } from './useBalance.js'

test('select data', async () => {
  const result = useBalance({
    query: {
      select(data) {
        return data?.value
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<bigint | undefined>()
})

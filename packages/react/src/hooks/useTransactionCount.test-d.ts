import { expectTypeOf, test } from 'vitest'

import { useTransactionCount } from './useTransactionCount.js'

test('select data', async () => {
  const result = useTransactionCount({
    query: {
      select(data) {
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<number | undefined>()
})

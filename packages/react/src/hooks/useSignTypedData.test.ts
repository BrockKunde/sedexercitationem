import { connect, disconnect, getAccount } from '@wagmi/core'
import { config, typedData } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { recoverTypedDataAddress } from 'viem'
import { expect, test } from 'vitest'

import { useSignTypedData } from './useSignTypedData.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useSignTypedData())

  result.current.signTypedData({
    types: typedData.basic.types,
    primaryType: 'Mail',
    message: typedData.basic.message,
  })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  await expect(
    recoverTypedDataAddress({
      types: typedData.basic.types,
      primaryType: 'Mail',
      message: typedData.basic.message,
      signature: result.current.data!,
    }),
  ).resolves.toEqual(getAccount(config).address)

  await disconnect(config, { connector })
})

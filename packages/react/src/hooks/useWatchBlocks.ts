'use client'

import {
  type Config,
  type ResolvedRegister,
  type WatchBlocksParameters,
  watchBlocks,
} from '@wagmi/core'
import { type UnionEvaluate, type UnionPartial } from '@wagmi/core/internal'
import { useEffect } from 'react'
import type { BlockTag } from 'viem'

import type { ConfigParameter, EnabledParameter } from '../types/properties.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWatchBlocksParameters<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = UnionEvaluate<
  UnionPartial<
    WatchBlocksParameters<includeTransactions, blockTag, config, chainId>
  > &
    ConfigParameter<config> &
    EnabledParameter
>

export type UseWatchBlocksReturnType = void

/** https://beta.wagmi.sh/react/hooks/useWatchBlocks */
export function useWatchBlocks<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
>(
  parameters: UseWatchBlocksParameters<
    includeTransactions,
    blockTag,
    config,
    chainId
  > = {} as any,
): UseWatchBlocksReturnType {
  const { enabled = true, onBlock, config: _, ...rest } = parameters

  const config = useConfig(parameters)
  const configChainId = useChainId()
  const chainId = parameters.chainId ?? configChainId

  useEffect(() => {
    if (!enabled) return
    if (!onBlock) return
    return watchBlocks(config, {
      ...(rest as any),
      chainId,
      onBlock,
    })
  }, [chainId, config, enabled, onBlock, rest])
}

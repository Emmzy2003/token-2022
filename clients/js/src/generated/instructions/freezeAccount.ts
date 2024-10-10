/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  AccountRole,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const FREEZE_ACCOUNT_DISCRIMINATOR = 10;

export function getFreezeAccountDiscriminatorBytes() {
  return getU8Encoder().encode(FREEZE_ACCOUNT_DISCRIMINATOR);
}

export type FreezeAccountInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountAccount extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAccount extends string
        ? WritableAccount<TAccountAccount>
        : TAccountAccount,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountOwner extends string
        ? ReadonlyAccount<TAccountOwner>
        : TAccountOwner,
      ...TRemainingAccounts,
    ]
  >;

export type FreezeAccountInstructionData = { discriminator: number };

export type FreezeAccountInstructionDataArgs = {};

export function getFreezeAccountInstructionDataEncoder(): Encoder<FreezeAccountInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: FREEZE_ACCOUNT_DISCRIMINATOR })
  );
}

export function getFreezeAccountInstructionDataDecoder(): Decoder<FreezeAccountInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getFreezeAccountInstructionDataCodec(): Codec<
  FreezeAccountInstructionDataArgs,
  FreezeAccountInstructionData
> {
  return combineCodec(
    getFreezeAccountInstructionDataEncoder(),
    getFreezeAccountInstructionDataDecoder()
  );
}

export type FreezeAccountInput<
  TAccountAccount extends string = string,
  TAccountMint extends string = string,
  TAccountOwner extends string = string,
> = {
  /** The account to freeze. */
  account: Address<TAccountAccount>;
  /** The token mint. */
  mint: Address<TAccountMint>;
  /** The mint freeze authority or its multisignature account. */
  owner: Address<TAccountOwner> | TransactionSigner<TAccountOwner>;
  multiSigners?: Array<TransactionSigner>;
};

export function getFreezeAccountInstruction<
  TAccountAccount extends string,
  TAccountMint extends string,
  TAccountOwner extends string,
  TProgramAddress extends Address = typeof TOKEN_2022_PROGRAM_ADDRESS,
>(
  input: FreezeAccountInput<TAccountAccount, TAccountMint, TAccountOwner>,
  config?: { programAddress?: TProgramAddress }
): FreezeAccountInstruction<
  TProgramAddress,
  TAccountAccount,
  TAccountMint,
  (typeof input)['owner'] extends TransactionSigner<TAccountOwner>
    ? ReadonlySignerAccount<TAccountOwner> & IAccountSignerMeta<TAccountOwner>
    : TAccountOwner
> {
  // Program address.
  const programAddress = config?.programAddress ?? TOKEN_2022_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    account: { value: input.account ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: false },
    owner: { value: input.owner ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Remaining accounts.
  const remainingAccounts: IAccountMeta[] = (args.multiSigners ?? []).map(
    (signer) => ({
      address: signer.address,
      role: AccountRole.READONLY_SIGNER,
      signer,
    })
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.account),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.owner),
      ...remainingAccounts,
    ],
    programAddress,
    data: getFreezeAccountInstructionDataEncoder().encode({}),
  } as FreezeAccountInstruction<
    TProgramAddress,
    TAccountAccount,
    TAccountMint,
    (typeof input)['owner'] extends TransactionSigner<TAccountOwner>
      ? ReadonlySignerAccount<TAccountOwner> & IAccountSignerMeta<TAccountOwner>
      : TAccountOwner
  >;

  return instruction;
}

export type ParsedFreezeAccountInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The account to freeze. */
    account: TAccountMetas[0];
    /** The token mint. */
    mint: TAccountMetas[1];
    /** The mint freeze authority or its multisignature account. */
    owner: TAccountMetas[2];
  };
  data: FreezeAccountInstructionData;
};

export function parseFreezeAccountInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedFreezeAccountInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      account: getNextAccount(),
      mint: getNextAccount(),
      owner: getNextAccount(),
    },
    data: getFreezeAccountInstructionDataDecoder().decode(instruction.data),
  };
}

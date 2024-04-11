import { getBlockExplorerTxUrl } from '../../../../util/networks';
import {
  IconColor,
  IconName,
} from '../../../../component-library/components/Icons/Icon';
import { strings } from '../../../../../locales/i18n';
import Logger from '../../../../util/Logger';
import { Theme } from '../../../../util/theme/models';
import { ChainId, HalRawNotification, Notification, TRIGGER_TYPES } from '../../../../util/notifications';
import { formatAddress } from '../../../../util/address';

interface ViewOnEtherscanProps {
  navigation: any;
  transactionObject: {
    networkID: string;
  };
  transactionDetails: {
    transactionHash: string;
  };
  providerConfig: {
    type: string;
  };
  close?: () => void;
}

interface NotificationRowProps {
  row: {
    createdAt: string;
    title: string;

    avatarBadge?: IconName;
    imageUri?: string;
    asset?: {
      symbol?: string;
      name?: string;
    };
    value?: string;
  };
  details: Record<string, any>;
}

export const sortNotifications = (
  notifications: Notification[],
): Notification[] =>
  notifications.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0,
  );

export const getNotificationBadge = (trigger_type: string) => {
  switch (trigger_type) {
    case TRIGGER_TYPES.ERC20_SENT:
    case TRIGGER_TYPES.ERC721_SENT:
    case TRIGGER_TYPES.ERC1155_SENT:
    case TRIGGER_TYPES.ETH_SENT:
      return IconName.Arrow2Upright;
    case TRIGGER_TYPES.ERC20_RECEIVED:
    case TRIGGER_TYPES.ERC721_RECEIVED:
    case TRIGGER_TYPES.ERC1155_RECEIVED:
    case TRIGGER_TYPES.ETH_RECEIVED:
      return IconName.Received;
    case TRIGGER_TYPES.METAMASK_SWAP_COMPLETED:
      return IconName.SwapHorizontal;
    case TRIGGER_TYPES.ROCKETPOOL_STAKE_COMPLETED:
    case TRIGGER_TYPES.ROCKETPOOL_UNSTAKE_COMPLETED:
    case TRIGGER_TYPES.LIDO_STAKE_COMPLETED:
    case TRIGGER_TYPES.LIDO_STAKE_READY_TO_BE_WITHDRAWN:
    case TRIGGER_TYPES.LIDO_WITHDRAWAL_REQUESTED:
    case TRIGGER_TYPES.LIDO_WITHDRAWAL_COMPLETED:
      return IconName.Plant;
    default:
      return IconName.Sparkle;
  }
};

export function formatDate(createdAt: Date) {
  const now = new Date();
  const date = createdAt;

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    const diffMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );
    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) {
    return 'Yesterday';
  }

  if (date.getFullYear() === now.getFullYear()) {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  }

  return date.toLocaleDateString('default', {
    month: 'short',
    day: 'numeric',
  });
}

export function viewOnEtherscan(props: ViewOnEtherscanProps, state: any) {
  const {
    navigation,
    transactionObject: { networkID },
    transactionDetails: { transactionHash },
    providerConfig: { type },
    close,
  } = props;
  const { rpcBlockExplorer } = state;
  try {
    const { url, title } = getBlockExplorerTxUrl(
      type,
      transactionHash,
      rpcBlockExplorer,
    );
    navigation.push('Webview', {
      screen: 'SimpleWebview',
      params: { url, title },
    });
    close?.();
  } catch (e) {
    // eslint-disable-next-line no-console
    Logger.error(e, {
      message: `can't get a block explorer link for network `,
      networkID,
    });
  }
}

function getNetwork(chain_id: HalRawNotification['chain_id']) {
  return ChainId[chain_id]
}

export function formatNotificationTitle(rawTitle: string): string {
  const words = rawTitle.split('_');
  words.shift();
  return words.join('_');
}

export function getRowDetails(
  notification: Notification,
): NotificationRowProps | null {
  if (!notification.data) {
    return null;
  }

  if (notification.type !== TRIGGER_TYPES.FEATURES_ANNOUNCEMENT) {
    switch (notification.data.kind) {
      case 'lido_stake_completed':
      case 'lido_withdrawal_completed':
      case 'rocketpool_stake_completed':
      case 'rocketpool_unstake_completed':
      case 'lido_withdrawal_requested':
        return {
          row: {
            avatarBadge: getNotificationBadge(notification.type),
            createdAt: formatDate(notification.createdAt),
            imageUri: notification.data.stake_out.image,
            asset: {
              symbol: notification.data.stake_out.symbol,
              name: notification.data.stake_out.name,
            },
            title: strings(formatNotificationTitle(notification.data.kind)),
            value: `${notification.data.stake_out.amount} ${notification.data.stake_out.symbol}`,
          },
          details: {},
        };
      case 'lido_stake_ready_to_be_withdrawn':
        return {
          row: {
            avatarBadge: getNotificationBadge(notification.type),
            createdAt: formatDate(notification.createdAt),
            imageUri: notification.data.staked_eth.image,
            asset: {
              symbol: notification.data.staked_eth.symbol,
              name: notification.data.staked_eth.name,
            },
            title: strings(formatNotificationTitle(notification.data.kind)),
            value: `${notification.data.staked_eth.amount} ${notification.data.staked_eth.symbol}`,
          },
          details: {},
        };
      case 'metamask_swap_completed':
        return {
          row: {
            avatarBadge: getNotificationBadge(notification.type),
            createdAt: formatDate(notification.createdAt),
            imageUri: notification.data.token_out.image,
            asset: {
              symbol: notification.data.token_out.symbol,
              name: notification.data.token_out.name,
            },
            title: strings(formatNotificationTitle(notification.data.kind), {
              from: notification.data.token_in.symbol,
            }),
            value: `${notification.data.token_out.amount} ${notification.data.token_out.symbol}`,
          },
          details: {},
        };
      case 'eth_sent':
      case 'eth_received':
        return {
          row: {
            avatarBadge: getNotificationBadge(notification.type),
            createdAt: formatDate(notification.createdAt),
            title: strings(formatNotificationTitle(notification.data.kind), {
              address: formatAddress(
                notification.data.kind.includes('sent')
                  ? notification.data.to
                  : notification.data.from,
                'short',
              ),
            }),
            value: `${notification.data.amount.eth} ETH`,
          },
          details: {
            from: notification.data.from,
            to: notification.data.to,
            status: notification.tx_hash,
            asset:,
            network: getNetwork(notification.chain_id),
          },
        };
      case 'erc20_sent':
      case 'erc20_received':
        return {
          row: {
            avatarBadge: getNotificationBadge(notification.type),
            createdAt: formatDate(notification.createdAt),
            imageUri: notification.data.token.image,
            asset: {
              symbol: notification.data.token.symbol,
              name: notification.data.token.name,
            },
            title: strings(formatNotificationTitle(notification.data.kind), {
              address: formatAddress(
                notification.data.kind.includes('sent')
                  ? notification.data.to
                  : notification.data.from,
                'short',
              ),
            }),
            value: `${notification.data.token.amount} ${notification.data.token.symbol}`,
          },
          details: {},
        };
      case 'erc721_sent':
      case 'erc721_received':
      case 'erc1155_sent':
      case 'erc1155_received':
        return {
          row: {
            avatarBadge: getNotificationBadge(notification.type),
            createdAt: formatDate(notification.createdAt),
            imageUri: notification.data?.nft?.image,
            asset: {
              symbol: notification.data?.nft?.collection.symbol,
              name: notification.data?.nft?.collection.name,
            },
            title: strings(formatNotificationTitle(notification.data.kind), {
              address: formatAddress(
                notification.data.kind.includes('sent')
                  ? notification.data.to
                  : notification.data.from,
                'short',
              ),
            }),
            value: `#${notification.data?.nft?.token_id}`,
          },
          details: {},
        };

      default:
        return { row: {} as any, details: {} as any };
    }
  }

  return {
    row: {
      title: notification.data.title,
      asset: { name: notification.data.shortDescription },
      createdAt: formatDate(notification.createdAt),
    },
    details: {},
  };
}

export enum AvatarType {
  ADDRESS = 'address',
  ASSET = 'asset',
  NETWORK = 'network',
  TXSTATUS = 'txstatus',
}

export enum TxStatus {
  UNAPPROVED = 'unapproved',
  SUBMITTED = 'submitted',
  SIGNED = 'signed',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  APPROVED = 'approved',
  FAILED = 'failed',
  REJECTED = 'rejected',
}

export const returnAvatarProps = (status: TxStatus, theme: Theme) => {
  switch (status) {
    case TxStatus.CONFIRMED:
    case TxStatus.APPROVED:
      return {
        name: IconName.Check,
        backgroundColor: theme.colors.success.muted,
        iconColor: IconColor.Success,
      };
    case TxStatus.UNAPPROVED:
    case TxStatus.CANCELLED:
    case TxStatus.FAILED:
    case TxStatus.REJECTED:
      return {
        name: IconName.Close,
        backgroundColor: theme.colors.error.muted,
        iconColor: IconColor.Error,
      };
    case TxStatus.PENDING:
    case TxStatus.SUBMITTED:
    case TxStatus.SIGNED:
      return {
        name: IconName.Clock,
        backgroundColor: theme.colors.warning.muted,
        iconColor: IconColor.Warning,
      };
    default:
      return {
        name: IconName.Info,
        backgroundColor: theme.colors.background.alternative,
        iconColor: IconColor.Info,
      };
  }
};

export const networkFeeDetails = {
  'transactions.gas_limit': 'gas',
  'transactions.gas_used': 'gasUsed',
  'transactions.base_fee': 'estimatedBaseFee',
  'transactions.priority_fee': 'maxPriorityFeePerGas',
  'transactions.max_fee': 'maxPriorityFeePerGas',
};

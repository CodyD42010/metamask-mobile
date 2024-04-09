import { strings } from '../../../../../locales/i18n';
import { getNotificationBadge } from '../../Notifications/utils';
import { NotificationsActionsTypes } from './NotificationsSettings.constants';

const notificationsRows = [
  {
    icon: getNotificationBadge(NotificationsActionsTypes.SENT),
    title: strings(`app_settings.notifications_opts.assets_sent_title`),
    description: strings(`app_settings.notifications_opts.assets_sent_desc`),
    disabled: false,
    value: true,
  },
  {
    icon: getNotificationBadge(NotificationsActionsTypes.RECEIVED),
    title: strings(`app_settings.notifications_opts.assets_received_title`),
    description: strings(
      `app_settings.notifications_opts.assets_received_desc`,
    ),
    disabled: false,
    value: true,
  },
  {
    icon: getNotificationBadge(NotificationsActionsTypes.DEFI),
    title: strings(`app_settings.notifications_opts.defi_title`),
    description: strings(`app_settings.notifications_opts.defi_desc`),
    disabled: false,
    value: true,
  },
  {
    icon: getNotificationBadge(NotificationsActionsTypes.SNAPS),
    title: strings(`app_settings.notifications_opts.snaps_title`),
    description: strings(`app_settings.notifications_opts.snaps_desc`),
    disabled: false,
    value: true,
  },
  {
    icon: getNotificationBadge(NotificationsActionsTypes.FCM),
    title: strings(
      `app_settings.notifications_opts.products_announcements_title`,
    ),
    description: strings(
      `app_settings.notifications_opts.products_announcements_desc`,
    ),
    disabled: false,
    value: true,
  },
];

export default notificationsRows;

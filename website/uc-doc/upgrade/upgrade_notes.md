---
title: Upgrade notes
sidebar_position: 1
---

## 25.01 {#25-01}

- The embedded API documentation (`https://<wazo-ip>/api`) has been removed. You can access the same
  documentation via the [API Console](https://wazo-platform.org/documentation) on the Wazo platform
  website, using your `<wazo-ip>` for local API access.
- The configuration section names in the confbridge configuration file have been changed to use the
  prefix `wazo_` instead of `xivo_`. If you manually modified these configuration section in
  `/etc/asterisk/confbridge.d/*.conf` you MUST use the new names.
- The following channel variables have been renamed. If you used them in a subroutine you MUST use
  the new name to maintain a working dialplan in the future. The old names have been kept for
  retrocompatibility, so your dialplan should keep working for the moment. Deprecation messages will
  appear in the Asterisk CLI if you try to modify those variables. Support for the old variables may
  be removed in any later release.

  - `XIVO_HANGUPRINGTIME` -> `WAZO_HANGUPRINGTIME`
  - `XIVO_REAL_CONTEXT` -> `WAZO_REAL_CONTEXT`
  - `XIVO_REAL_NUMBER` -> `WAZO_REAL_NUMBER`


Consult the
[25.01 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2025.01)
for more information.

## 24.17 {#24-17}

Consult the
[24.17 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.17)
for more information.

## 24.16 {#24-16}

Consult the
[24.16 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.16)
for more information.

## 24.15 {#24-15}

Consult the
[24.15 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.15)
for more information.

## 24.14 {#24-14}

- The `xivo-fix-paths-rights` upgrade script has been removed from the `pre-start.d` script
  collection. The core of the changes that this script does has been included in the asterisk
  packaging. If you have any issues with file permissions, it is still possible to run it manually
  by executing `xivo-fix-paths-rights`.

Consult the
[24.14 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.14)
for more information.

## 24.13 {#24-13}

Consult the
[24.13 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.13)
for more information.

## 24.12 {#24-12}

Consult the
[24.12 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.12)
for more information.

## 24.11 {#24-11}

- Wazo services logs are no longer captured by `rsyslog` and written in `/var/log/daemon.log` and
  `/var/log/syslog`.

Consult the
[24.11 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.11)
for more information.

## 24.10 {#24-10}

- The default authentication method has been changed from `default` to `native` for `external_api`
  users. If you relied on an `external_api` user using `saml` or `ldap` authentication you will need
  to update that user's authentication method to the desired value.
- The Calls API is now tenant-aware for read operations. API calls from the root tenant now require
  the `recurse` argument.

Consult the
[24.10 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.10)
for more information.

## 24.09 {#24-09}

- New restriction in place which prevents a user from creating too many tokens simultaneously. By
  default, the limit is set to 100, but can be modified in wazo-auth configuration files. If a user
  tries to create more than the allowed limit, an error will be returned.

Consult the
[24.09 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.09)
for more information.

## 24.08 {#24-08}

- Users and tenants now have `authentication_method` and `default_authentication_method` fields.
  Tenants using LDAP authentication MUST set their administrative user accounts to use
  `authentication_method: native` and set their tenant to use `default_authentication_method: ldap`.
- Calls will be hung up automatically after 10 hours.

Consult the
[24.08 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.08)
for more information.

## 24.07 {#24-07}

- `wazo-webhookd` now supports Firebase Cloud Messaging v1 API. The current mobile notifications
  configuration using FCM must be migrated to the new credentials before June 2024, using the
  `fcm_service_account_info` field of `wazo-auth` `/0.1/external/mobile/config`. The contents of
  this field must be the contents of the JSON file provided by Google in their
  [migration documentation](https://firebase.google.com/docs/cloud-messaging/migrate-v1#provide-credentials-manually).
  Please note that the `fcm_sender_id` field is still necessary, only `fcm_api_key` is deprecated.

Consult the
[24.07 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.07)
for more information.

## 24.06 {#24-06}

Consult the
[24.06 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.06)
for more information.

## 24.05 {#24-05}

- Asterisk version has been updated:

  - [Asterisk 20 to 21 Upgrade Notes](/uc-doc/upgrade/upgrade_notes_details/24-05/asterisk_21)

Consult the
[24.05 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.05)
for more information.

## 24.04 {#24-04}

Consult the
[24.04 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.04)
for more information.

## 24.03 {#24-03}

Consult the
[24.03 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%20%3D%20WAZO%20AND%20fixVersion%20%3D%2024.03)
for more information.

## 24.02 {#24-02}

- `xivo-bus` has been renamed to `wazo-bus`. We've added a compatibility layer to avoid breaking
  custom development depending on `xivo-bus`. We recommend to upgrade to `wazo-bus` as soon as
  possible since `xivo-bus` will be removed completely in a future version.

- The global parking lot with default extension 700 has been removed. If you need the parking lot
  feature, you need to create one first.
- Any leftover function key to parking lots remaining from 18.03 have been deleted, since they were
  unusable in the later versions.

- Python module for provisioning plugins has been renamed from `provd` to `wazo_provd`. For any
  custom provisioning plugin development, we recommend to upgrade to `wazo_provd` as soon as
  possible since `provd` name will be removed completely in a future version.

- The following channel variables have been renamed. If you used them in a subroutine you MUST use
  the new name to maintain a working dialplan in the future. The old names have been kept for
  retrocompatibility, so your dialplan should keep working for the moment. Deprecation messages will
  appear in the Asterisk CLI if you try to modify those variables. Support for the old variables may
  be removed in any later release.

  - `XIVO_CALLOPTIONS` -> `WAZO_CALLOPTIONS`
  - `XIVO_CALLORIGIN` -> `WAZO_CALLORIGIN`
  - `XIVO_DSTID` -> `WAZO_DSTID`
  - `XIVO_DSTNUM` -> `WAZO_DSTNUM`
  - `XIVO_DST_EXTEN_ID` -> `WAZO_DST_EXTEN_ID`
  - `XIVO_INTERFACE` -> `WAZO_INTERFACE`
  - `XIVO_GROUPNAME` -> `WAZO_GROUPNAME`
  - `XIVO_GROUPOPTIONS` -> `WAZO_GROUPOPTIONS`
  - `XIVO_PICKEDUP` -> `WAZO_PICKEDUP`
  - `XIVO_QUEUENAME` -> `WAZO_QUEUENAME`
  - `XIVO_QUEUEOPTIONS` -> `WAZO_QUEUEOPTIONS`
  - `XIVO_RINGSECONDS` -> `WAZO_RINGSECONDS`
  - `XIVO_MOBILEPHONENUMBER` -> `WAZO_MOBILEPHONENUMBER`
  - `XIVO_SRCNUM` -> `WAZO_SRCNUM`
  - `XIVO_FROMGROUP` -> `WAZO_FROMGROUP`
  - `XIVO_FROMQUEUE` -> `WAZO_FROMQUEUE`
  - `XIVO_ENABLEDND` -> `WAZO_ENABLEDND`
  - `XIVO_ENABLEUNC` -> `WAZO_ENABLEUNC`

- The following dialplan context have been renamed. If you used them in your dialplan you MUST use
  the new name. The old names have been kept for retrocompatibility, so your dialplan should keep
  working for the moment. Deprecation messages will appear in the Asterisk CLI until all usage of
  these contexts have been removed. Support for the old contexts may be removed in any later
  release.

  - `xivo-verbose` -> `wazo-verbose`
  - `xivo-subroutine` -> `wazo-subroutine`
  - `xivo-global-subroutine` -> `wazo-global-subroutine`
  - `xivo-fwd-subroutine` -> `wazo-fwd-subroutine`

- The following global variables have been renamed. The new names MUST be used. If you used them in
  your dialplan you MUST use the new name to maintain a working dialplan in the future. The old
  names have been kept for retrocompatibility, so your dialplan should keep working for the moment.
  Support for the old variables may be removed in any later release.

  - `XIVO_AGID_IP` -> `WAZO_AGID_IP`
  - `XIVO_USERID` -> `WAZO_USERID`
  - `XIVO_USERUUID` -> `WAZO_USERUUID`

- If you modified the `*3` feature extension to toggle call recording, you MUST manually update you
  extension definition to use the `WAZO_AGID_IP` variable instead of `XIVO_AGID_IP`.

Consult the
[24.02 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.02)
for more information.

## 24.01 {#24-01}

- `xivo-certs` has been renamed to `wazo-certs`. You may need to update custom configuration to
  point to the new path `/usr/share/wazo-certs/server.{key,cert}`.
- `xivo-sync` has been renamed to `wazo-sync`. You must use the new name when configuring high
  availability.

Consult the
[24.01 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.01)
for more information.

## 23.17 {#23-17}

Consult the
[23.17 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.17)
for more information.

## 23.16 {#23-16}

- wazo-provd is now proxied by NGINX service. Since it should not be impactful, you may want to be
  careful if you have a custom setup.

- The following wazo-provd configuration options have been renamed:

  - `ip` / `external_ip` --> `advertised_host`
  - `http_port` --> `advertised_http_port`
  - `base_external_url` --> `advertised_http_url`
  - `num_http_proxies` --> `http_proxied_trusted_proxies_count`

Consult the
[23.16 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.16)
for more information.

## 23.15 {#23-15}

Consult the
[23.15 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.15)
for more information.

## 23.14 {#23-14}

- Directory sources of type `phonebook` that are configured to an invalid phonebook will be deleted.

Consult the
[23.14 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.14)
for more information.

## 23.13 {#23-13}

- `wazo-provd` now listens on TCP port 18667 locally and is exposed on TCP port 8667 through
  `nginx`. If you are using any other port than TCP 8667 for provisioning, you may need to change
  the configuration of `wazo-provd` or `nginx`.

Consult the
[23.13 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.13)
for more information.

## 23.12 {#23-12}

Consult the
[23.12 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.12)
for more information.

## 23.11 {#23-11}

- The existing phonebook API from wazo-dird (using `/tenant/<tenant_name>/phonebook` as base url and
  `<phonebook_id>` as resource identifier) is being deprecated in favour of new API (using
  `/phonebooks` as base url) and will be removed in a future release.

- Added required field `phonebook_uuid` to phonebook source resource (`/backend/phonebook/sources`).
  This attribute should point to a valid existing phonebook. Existing phonebook sources created
  without this attribute may be deleted by a database migration in a future release.

Consult the
[23.11 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.11)
for more information.

## 23.10 {#23-10}

Consult the
[23.10 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.10)
for more information.

## 23.09 {#23-09}

Consult the
[23.09 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.09)
for more information.

## 23.08 {#23-08}

- Music on hold files are now validated to avoid issues with asterisk. The validation occurs only if
  the music class is of mode `files`. The validation ensures that only WAV files in mono, 8kHz/16kHz
  sample rate and a bit depth of no more than 16 bits can be uploaded. The invalid files are going
  to be migrated to the `/var/lib/asterisk/moh/.invalid` directory and removed from the MOH class.

Consult the
[23.08 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.08)
for more information.

## 23.07 {#23-07}

Consult the
[23.07 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.07)
for more information.

## 23.06 {#23-06}

- **Debian has been upgraded from version 10 (Buster) to 11 (Bullseye).** Please see the following
  detailed upgrade notes for more information:

  - [Debian 11 (Bullseye) Upgrade Notes](/uc-doc/upgrade/upgrade_notes_details/23-06/bullseye)

- As part of the upgrade to Debian 11, many packages will be updated, notably this includes
  PostgreSQL from 11 to 13 and Python from 3.7 to 3.9, so be sure to check for compatibility and
  changes if there are any custom scripts or plugins.
- The `i386` (32 bit) architecture (deprecated since 20.16) has been dropped from our mirror.

Consult the
[23.06 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.06)
for more information.

## 23.05 {#23-05}

Consult the
[23.05 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.05)
for more information.

## 23.04 {#23-04}

- Asterisk version has been updated:

  - [Asterisk 19 to 20 Upgrade Notes](/uc-doc/upgrade/upgrade_notes_details/23-04/asterisk_20)

Consult the
[23.04 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.04)
for more information.

## 23.03 {#23-03}

Consult the
[23.03 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.03)
for more information.

## 23.02 {#23-02}

- This version introduces the removal of various deprecated classes in the bus library:

  - `Marshaller`, `PublishingQueue`, `FailFastPublisher`, `LongLivedPublisher`, `BaseEvent`,
    `ResourceConfigEvent` and `ArbitraryEvent` have been removed

  If you have custom scripts still relying on `ArbitraryEvent`, you should update your code to use
  either `ServiceEvent`, `TenantEvent` or `UserEvent` instead. For more details and examples, please
  see our [blog article about Wazo Platform events](/blog/new-events-documentation).

- `dahdi-linux-modules` is not supported anymore. Any custom installation using wazo packages must
  be removed manually:

  - Remove `/etc/wazo-confgend/conf.d/chan_dahdi.yml`
  - Remove `chan_dahdi.so` from `/etc/asterisk/modules.conf`
  - `apt purge wazo-asterisk-extra-modules`
  - Remove `/usr/share/wazo-upgrade/pre-start.d/upgrade-dahdi-linux-modules.sh`

- `wazo-auth` usernames and e-mail addresses are now case insensitive. If any duplicate is found
  during the upgrade, they will be prefixed by `duplicateXX`, where `XX` is the occurence number.

Consult the
[23.02 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.02)
for more information.

## 23.01 {#23-01}

- All Wazo clients are now only compatible with Python 3 (the version included in the current
  distro). So, if you have any custom python scripts written in Python 2, you must upgrade them to
  Python 3. The Python 3 version of most wazo packages are suffixed with `-python3`and can be
  installed with `apt`. eg. `apt install wazo-provd-client-python3`

- All Wazo components are now only compatible with Python 3 (the version included in the current
  distro) and only no longer provide any Python 2 builds. If you have any custom scripts or
  libraries that extend wazo components, and they are written in Python 2, you may need to update
  them. For wazo libraries that had separate packages for Python 2 and 3 you may need to install the
  Python 3 version. They are usually suffixed by `-python3`.

- Support for the `b` `Dial` option in the XIVO_CALLOPTIONS in subroutine has been deprecated since
  21.01 in favor of `wazo-add-pre-dial-hook`. Automatic conversion of the `b` option to the new
  pre-dial-hook system is now removed, and any remaining legacy configurations will now need to be
  updated accordingly. See [pre-dial handlers](/uc-doc/api_sdk/subroutine) and
  [21.01 release notes](.#21.01) for more details.

- Bus configuration changes for all services (excluding wazo-auth). If you use custom configuration,
  you might have to review these settings

  - key `exchange_name` now defaults to `wazo-headers` instead of `xivo`
  - key `exchange_type` has been removed (recent versions have migrated to headers routing and is no
    longer configurable)

Consult the
[23.01 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.01)
for more information.

## 22.17 {#22-17}

- A new database index is being added on call logs. This operation can be time-consuming on systems
  with many existing call logs.

  For systems with millions of existing call logs, the index can be created manually while the
  system is running to avoid downtime using the following command:
  `sudo -u postgres psql asterisk -c "create index if not exists call_logd_call_log_participant__idx__call_log_id on call_logd_call_log_participant (call_log_id)"`

- `consul` has been removed from wazo dependency by default. If you rely on this component, make
  sure to follow steps before upgrade:

  - Mark this package as manually installed: `apt-mark manual consul`
  - Enable service discovery for each service. An example can be found in `config.yml` of the
    service

Consult the
[22.17 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.17)
for more information.

## 22.16 {#22-16}

- `wazo-provd` now uses Python 3. The latest version of all plugins have been updated to use Python
  3 as well. The default plugin repository has been changed from
  `https://provd.wazo.community/plugins/1/stable` (python 2) to
  `https://provd.wazo.community/plugins/2/stable` (python 3). This change should be automatic, but
  if you are using a custom URL it will need to be updated to one containing Python 3 compatible
  plugins. If you happen to have devices using a plugin that is no longer provided by us, it will
  not be possible to use it anymore without manual intervention. See the
  [detailed upgrade notes](/uc-doc/upgrade/upgrade_notes_details/22-16/provd_plugins_python3) for
  more information.

- There is a behaviour change to the room API from `wazo-chatd`. There can only be one room for the
  same participants. For example, Bob and Alice can only have one chat room with each other. To
  leave time to migrate, creating another room will return the same room instead of raising a 409
  error. However, this behaviour will change in the future.

  - **Important**: To implement this change with existing chat rooms, all rooms with the same set of
    users have been merged together.

- `xivo-berofos` CLI and `bntools` package have been removed and are not supported anymore

Consult the
[22.16 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.16)
for more information.

## 22.15 {#22-15}

- The SIP template `webrtc_video` was merged into the SIP template `webrtc`. If you modified the
  template `webrtc_video` prior to the migration to 22.15, the `webrtc_video` template has been left
  in place, though all references from other templates will be moved to `webrtc` instead. You will
  have to either move your SIP template custom config to `webrtc` or restore the references from
  other SIP templates.

Consult the
[22.15 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.15)
for more information.

## 22.14 {#22-14}

Consult the
[22.14 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.14)
for more information.

## 22.13 {#22-13}

Consult the
[22.13 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.13)
for more information.

## 22.12 {#22-12}

Consult the
[22.12 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.12)
for more information.

## 22.11 {#22-11}

Consult the
[22.11 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.11)
for more information.

## 22.10 {#22-10}

- Asterisk version has been updated:
  - [Asterisk 18 to 19 Upgrade Notes](/uc-doc/upgrade/upgrade_notes_details/22-10/asterisk_19)
- Backup directory has been moved from `/var/backups/xivo` to `/var/backups/wazo`
- `xivo-backup` script has been renamed to `wazo-backup`. `xivo-backup` is now deprecated and will
  be removed in future version.
- Admin users of a tenant are now part of an admin group (one group per tenant). The admin
  permissions policy has been moved to the new admin group, instead of each individual admin user.
  New admin users are expected to be placed into this group.

Consult the
[22.10 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.10)
for more information.

## 22.09 {#22-09}

- Webhooks are now tenant-aware

  - Webhooks defined in a tenant will only trigger on events originating from within that tenant.
  - Webhooks defined in the master tenant will trigger on events from all tenants.

- All HTTP URLs on port 80 have been redirected to HTTPS on port 443, including the following URLs:

  - GET http://wazo.example.com/
  - GET http://wazo.example.com/api

  This does not impact HTTP requests made by physical phones, using ports 8667 for provisioning and
  9498 for directories and some phone key features.

Consult the
[22.09 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.09)
for more information.

## 22.08 {#22-08}

Consult the
[22.08 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.08)
for more information.

## 22.07 {#22-07}

- Port 5040 from asterisk is now disabled by default. If custom development need it, add
  configuration file:

  - Example: `/etc/asterisk/http.d/50-custom.conf`

  ```ini
  [general](+)
  tlsenable=yes
  tlsbindaddr=127.0.0.1:5040
  tlscertfile=/usr/share/xivo-certs/server.crt
  tlsprivatekey=/usr/share/xivo-certs/server.key
  ```

Consult the
[22.07 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.07)
for more information.

## 22.06 {#22-06}

Consult the
[22.06 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.06)
for more information.

## 22.05 {#22-05}

Consult the
[22.05 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.05)
for more information.

## 22.04 {#22-04}

Consult the
[22.04 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.04)
for more information.

## 22.03 {#22-03}

Consult the
[22.03 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.03)
for more information.

## 22.02 {#22-02}

Consult the
[22.02 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.02)
for more information.

## 22.01 {#22-01}

Consult the
[22.01 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.01)
for more information.

## 21.16 {#21-16}

- Throttling was added in the nginx configuration of the following routes:

  - `/api/auth/0.1/backends`
  - `/api/auth/0.1/status`
  - `/api/confd/1.1/guests/me/meetings/<meeting_uuid>`
  - `/api/confd/1.1/wizard`

  The request rate is limited at 25 requests per second, with an allowed burst of 15 requests. If
  you have any nginx custom configuration (e.g. using certbot), you will be asked a question about
  the `/etc/nginx/sites-available/wazo` configuration file during the upgrade. You _must_ accept the
  maintainer version, then reapply your custom configuration, which is saved in
  `/etc/nginx/sites-available/wazo.dpkg-old`.

- If you installed Wazo Platform before 21.01, you will have an error about an invalid signature.
  See the [troubleshooting](/uc-doc/upgrade#invalid-signature-before-2201-only) section for the fix.

Consult the
[21.16 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.16)
for more information.

## 21.15 {#21-15}

Consult the
[21.15 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.15)
for more information.

## 21.14 {#21-14}

Consult the
[21.14 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.14)
for more information.

## 21.13 {#21-13}

Consult the
[21.13 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.13)
for more information.

## 21.12 {#21-12}

Consult the
[21.12 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.12)
for more information.

## 21.11 {#21-11}

Consult the
[21.11 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.11)
for more information.

## 21.10 {#21-10}

- All Snom, Yealink and Aastra / Mitel phone plugins now use by default the following preferred
  codecs: G711A, G711U, G722 and G729. Other codecs are disabled by default. Administrators wanting
  to use other codecs must define them in
  [custom templates](/documentation/overview/provisioning-admin.html).

- The `wazo-dird` Google backend has migrated from using the deprecated Contacts API to the People
  API. To make valid requests, the Google Cloud application must have either the
  `https://www.googleapis.com/auth/contacts` or the
  `https://www.googleapis.com/auth/contacts.readonly`
  [permissions](https://developers.google.com/people/contacts-api-migration#read). Also, the Google
  Cloud application must enable the People API instead of the Contacts API;
  [here's how to do that](https://support.google.com/googleapi/answer/6158841?hl=en).

Consult the
[21.10 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.10)
for more information.

## 21.09 {#21-09}

- You are now required to have the same access you are attempting to assign to another resource
  (i.e. users/groups). Following this logic, admin now have access to all resources in their tenant
  by default.

Consult the
[21.09 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.09)
for more information.

## 21.08 {#21-08}

Consult the
[21.08 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.08)
for more information.

## 21.07 {#21-07}

Consult the
[21.07 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.07)
for more information.

## 21.06 {#21-06}

- Call recording filenames are now exposed using the CDR API. The filenames on the filesystem are
  now auto-generated using a UUID and an extension only.
- Call recording files are now automatically purged (default: after 1 year). However, call recording
  files that were created before Wazo Platform 21.03 will not be purged automatically. Those
  recording files can be found in `/var/lib/wazo/sounds/tenants/*/monitor` and you can remove the
  **older** files manually without risk.

Consult the
[21.06 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.06)
for more information.

## 21.05 {#21-05}

- `wazo-sysconfd` configuration has been migrated to `/etc/wazo-sysconfd/config.yml`. However, if
  you had modified the `/etc/xivo/sysconfd.conf` configuration file, you should create a new file in
  the `/etc/wazo-sysconfd/conf.d` directory with your changes.

Consult the
[21.05 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.05)
for more information.

## 21.04 {#21-04}

- `xivo-sysconfd` has been renamed to `wazo-sysconfd`
- Call recording will now play a beep when the recording starts and end. This behavior can be
  modified in `/etc/xivo/asterisk/xivo_globals.conf` by modifying the `WAZO_MIXMONITOR_OPTIONS`. See
  the
  [Asterisk documentation](https://docs.asterisk.org/Asterisk_18_Documentation/API_Documentation/Dialplan_Applications/MixMonitor)
  for available options.
- The group resource is now identified by a UUID instead of sequential ID. The API using sequential
  ID will keep working for a while. Policies with permissions for a specific group will have to be
  changed to use the UUID of the group instead of its ID. This only happens if you create policies
  with permissions limited to a specific group.

  For example: `confd.groups.42.read` would have to be updated to use the UUID of the group with
  ID 42.

Consult the
[21.04 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.04)
for more information.

## 21.03 {#21-03}

- Call logs have been moved to wazo-call-logd database. The migration will be automated for everyone
  with less than 10M entries, for the others, the upgrade will ask you to run the
  `wazo-call-logd-migrate-db` command manually to complete the migration. Note that this command can
  take a while to execute.

- The following dialplan variables have been deprecated from the Wazo dialplan

  - `XIVO_GROUPSUB` should be replaced by the `__WAZO_GROUP_SUBROUTINE` variable
  - `XIVO_QUEUESUB` should be replaced by the `__WAZO_QUEUE_SUBROUTINE` variable

- Call recording will now record calls on queues and groups when the answering user has the
  recording option enabled.

Consult the
[21.03 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.03)
for more information.

## 21.02 {#21-02}

Consult the
[21.02 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.02)
for more information.

## 21.01 {#21-01}

- Asterisk version has been updated:
  - [Asterisk 17 to 18 Upgrade Notes](/uc-doc/upgrade/upgrade_notes_details/21-01/asterisk_18)
- Deprecated conference system (`meetme`) has been completely removed. Meetme conferences have not
  been configurable since 18.03 and unusable since 19.17. Note that recordings have been removed
  from backup (i.e. `/var/spool/asterisk/meetme`).
- The way pre-dial handlers can be added in a subroutine has been changed. See
  [pre-dial handlers](/uc-doc/api_sdk/subroutine) for more details.

  - If you used custom dialplan to add the `b` option to the `XIVO_CALLOPTIONS` you should update it
    to use the `wazo-add-pre-dial-hook` subroutine.

    ```dialplan
    ; A subroutine with this line
    same = n,Set(XIVO_CALLOPTIONS=${XIVO_CALLOPTIONS}b(my-subroutine^s^1))
    ; should become
    same = n,GoSub(wazo-add-pre-dial-hook,s,1(my-subroutine))
    ```

- dahdi-linux-modules has been removed by default if no configuration found (i.e.
  `/etc/asterisk/dahdi_channels.conf`). Moreover, wazo-upgrade will stop to upgrade this package by
  default.

Consult the
[21.01 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.01)
for more information.

## Archives

See our [old upgrade notes](/uc-doc/upgrade/archives/upgrade_notes)

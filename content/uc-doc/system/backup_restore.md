---
title: Backup/Restore
---

## Backup {#backup}

### Periodic backup

A backup of the database and the data are launched every day with a logrotate task. It is run at
06:25 a.m. and backups are kept for 7 days.

Logrotate task:

- `/etc/logrotate.d/wazo-backup`

Logrotate cron:

- `/etc/cron.daily/logrotate`

### Retrieve the backup

With shell access, you can retrieve them in `/var/backups/wazo`. In this directory you will find
`db.tgz` and `data.tgz` files for the database and data backups.

Backup scripts:

- `/usr/sbin/wazo-backup`

Backup location:

- `/var/backups/wazo`

### What is actually backed-up?

#### Data

Here is the list of folders and files that are backed-up:

- `/etc/asterisk/`
tar xvfp /var/tmp/db-manual.tgz -C /var/tmp
- `/etc/crontab`
- `/etc/dhcp/`
- `/etc/hostname`
- `/etc/hosts`
- `/etc/ldap/`
- `/etc/network/if-up.d/xivo-routes`
- `/etc/network/interfaces`
- `/etc/ntp.conf`
- `/etc/profile.d/xivo_uuid.sh`
- `/etc/resolv.conf`
- `/etc/ssl/`
- `/etc/systemd/`
- `/etc/wanpipe/`
- `/etc/wazo-agentd/`
- `/etc/wazo-agid/`
- `/etc/wazo-amid/`
- `/etc/wazo-auth/`
- `/etc/wazo-call-logd/`
- `/etc/wazo-calld/`
- `/etc/wazo-chatd/`
- `/etc/wazo-confd/`
- `/etc/wazo-confgend-client/`
- `/etc/wazo-dird/`
- `/etc/wazo-dxtora/`
- `/etc/wazo-phoned/`
- `/etc/wazo-plugind/`
- `/etc/wazo-purge-db/`
- `/etc/wazo-webhookd/`
- `/etc/wazo-websocketd/`
- `/etc/xivo/`
- `/root/.config/wazo-auth-cli/`
- `/usr/local/bin/`
- `/usr/local/sbin/`
- `/usr/local/share/`
- `/usr/share/wazo/WAZO-VERSION`
- `/var/lib/asterisk/`
- `/var/lib/wazo-auth-keys/`
- `/var/lib/wazo-provd/`
- `/var/lib/wazo/`
- `/var/log/asterisk/`
- `/var/spool/asterisk/`
- `/var/spool/cron/crontabs/`

The following files/folders are excluded from this backup:

- folders:
  - `/var/lib/wazo-provd/plugins/*/var/cache/*`
  - `/var/spool/asterisk/monitor/`
- files
  - `/var/lib/wazo-provd/plugins/wazo-polycom*/var/tftpboot/*.ld`
- _log_ files, _coredump_ files
- audio recordings
- and, files greater than 10 MiB or folders containing more than 100 files if they belong to one of
  these folders:
  - `/var/lib/asterisk/moh/`
  - `/var/lib/asterisk/sounds/custom/`
  - `/var/lib/wazo/sounds/`
  - `/var/spool/asterisk/monitor/`
  - `/var/spool/asterisk/voicemail/`

#### Database

The following databases from PostgreSQL are backed up:

- `asterisk`: all the configuration done via the web interface (exceptions: High Availability,
  Provisioning, Certificates)

### Creating backup files manually {#manual-backup}

**Warning**: A backup file may take a lot of space on the disk. You should check the free space on
the partition before creating one.

#### Database

You can manually create a _database_ backup file named `db-manual.tgz` in `/var/tmp` by issuing the
following commands:

```shell
wazo-backup db /var/tmp/db-manual
```

#### Files

You can manually create a _data_ backup file named `data-manual.tgz` in `/var/tmp` by issuing the
following commands:

```shell
wazo-backup data /var/tmp/data-manual
```

## Restore {#restore}

### Introduction {#intro-provisioning}

A backup of both the configuration files and the database used by a Wazo installation is done
automatically every day. These backups are created in the `/var/backups/wazo` directory and are kept
for 7 days.

### Limitations

- You must restore a backup on the **same version** of Wazo that was backed up (though the
  architecture -- `i386` or `amd64` -- may differ)
- You must restore a backup on a machine with the **same hostname and IP address**

### Before Restoring the System

**Warning**: Before restoring a Wazo on a fresh install you have to setup Wazo using the wizard.

Stop monit and all the Wazo services:

```shell
wazo-service stop
```

### Restoring System Files

System files are stored in the data.tgz file located in the `/var/backups/wazo` directory.

This file contains for example, voicemail files, musics, voice guides, phone set firmware,
provisioning server configuration database.

To restore the file :

```shell
tar xvfp /var/backups/wazo/data.tgz -C /
```

Or from the manual backup :

```shell
tar xvfp /var/tmp/data-manual.tgz -C /
```


Once the database and files have been restored, you can
[finalize the restore](/uc-doc/system/backup_restore#after-restore)

### Restoring the Database

**Warning**:

- This will destroy all the current data in your database.
- You have to check the free space on your system partition before extracting the backups.
- If restoring Wazo >= 18.01 on a different machine, you should not restore the system
  configuration, because of network interface names that would change. See
  [Alternative: Restoring and Keeping System Configuration](/uc-doc/system/backup_restore#restore-keep-system-config).

Database backups are created as `db.tgz` files in the `/var/backups/wazo` directory. These tarballs
contain a dump of the database used in Wazo.

In this example, we'll restore the database from a backup file named `db.tgz` placed in the home
directory of root.

First, extract the content of the `db.tgz` file into the `/var/tmp` directory and go inside the
newly created directory:

```shell
tar xvf /var/backups/wazo/db.tgz -C /var/tmp
```

Or from the manual backup :

```shell
tar xvfp /var/tmp/db-manual.tgz -C /var/tmp
```

Drop the asterisk database and restore it with the one from the backup:

```shell
sudo -u postgres dropdb asterisk
sudo -u postgres pg_restore -C -d postgres /var/tmp/pg-backup/asterisk-*.dump
```

Remove the cache files generated from the previous database:

```shell
rm -rf /var/cache/wazo-confgend/*
```

Once the database and files have been restored, you can
[finalize the restore](/uc-doc/system/backup_restore#after-restore)

#### Troubleshooting {#troubleshooting}

When restoring the database, if you encounter problems related to the system locale, see
[PostgreSQL localization errors](/uc-doc/troubleshooting#postgresql-localization-errors).

### Alternative: Restoring and Keeping System Configuration {#restore-keep-system-config}

System configuration like network interfaces is stored in the database. It is possible to keep this
configuration and only restore Wazo data.

Rename the asterisk database to `asterisk_previous`:

```shell
sudo -u postgres psql -c 'ALTER DATABASE asterisk RENAME TO asterisk_previous'
```

Restore the asterisk database from the backup:

```shell
sudo -u postgres pg_restore -C -d postgres /var/tmp/pg-backup/asterisk-*.dump
```

Restore the system configuration tables from the asterisk_previous database:

```shell
sudo -u postgres pg_dump -c -t dhcp -t netiface -t resolvconf asterisk_previous | sudo -u postgres psql asterisk
```

Drop the asterisk_previous database:

```shell
sudo -u postgres dropdb asterisk_previous
```

**Warning**: Restoring the `data.tgz` file also restores system files such as host hostname, network
interfaces, etc. You will need to reapply the network configuration if you restore the data.tgz
file.

Once the database and files have been restored, you can
[finalize the restore](/uc-doc/system/backup_restore#after-restore)

### After Restoring The System {#after-restore}

1. Restore the server UUID:

   ```shell
   XIVO_UUID=$(sudo -u postgres psql -d asterisk -tA -c 'select uuid from infos')
   echo "export XIVO_UUID=$XIVO_UUID" > /etc/profile.d/xivo_uuid.sh
   ```

   Then edit `/etc/systemd/system.conf` to update `XIVO_UUID` in `DefaultEnvironment`

2. You may reboot the system, or execute the following steps.
3. Update systemd runtime configuration:

   ```shell
   source /etc/profile.d/xivo_uuid.sh
   systemctl set-environment XIVO_UUID=$XIVO_UUID
   systemctl daemon-reload
   ```

4. Restart the services you stopped in the first step:

   ```shell
   wazo-service start
   ```

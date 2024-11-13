---
title: Security
---

This page gives an overview of security best practices that should be applied to a Wazo
installation. This is not an exhaustive documentation but a starting point that should be read to
avoid common security issues.

Most of this page is aimed at servers that are accessible from the Internet.

## fail2ban

Wazo comes with a pre-configured fail2ban. Fail2ban will block IP addresses that tried and failed to
gain access to the server. There are 3 jails that a configured.

### asterisk-wazo

The `asterisk-wazo` jail watches the Asterisk log file for failed registration attempts.

This jail protects against brute force attacks attempting to guess SIP accounts usernames and
password.

#### Whitelisting yourself to avoid getting locked out of your server

When trying out settings, you may get accidentally locked out of the server by fail2ban. If you get
in this situation, either:

- wait 5 minutes for the ban on your IP address to expire
- if you have console access, use the following command:
  ```shell
  fail2ban-client unbanip 172.16.99.99  # replace the value with your own IP address
  ```

For a permanent solution, use the following steps:

1. Create a file `/etc/fail2ban/jail.d/ignoreip.conf` with the following content:
   ```ini
   [asterisk-wazo]
   ignoreip = 172.16.99.99  # replace the value with your own IP address
   ```
1. Apply the changes:
   ```shell
   systemctl restart fail2ban
   ```

### wazo-provd

The `wazo-provd` jail will block attempts to create new devices and request for configuration files.

This jail has two goals:

- limiting DOS attacks by creating new devices repeatedly
- protecting against brute force attacks attempting to guess configuration file names.

See `provd-security` for more details.

### sshd

The `sshd` jail protects against SSH brute force attacks.

## Firewall

Wazo comes with iptables installed but does not configure any security rules. The only interaction
Wazo has with iptables are:

- fail2ban
- wazo-upgrade blocks SIP traffic during an upgrade, to avoid SIP phones to become temporarily
  unusable after the upgrade.

It is highly recommended that you configure firewall rules on your Wazo.

## Devices {#devices}

Your devices, phones and VoIP gateways, should not be accessible from the Internet. If you have no
choice, then the passwords should be changed. Most phones have two different passwords: admin and
user passwords.

Some devices allow Wazo to change the password from the auto provisioning system. To change the
default values, use `wazo-provd` endpoint `/provd/cfg_mgr/configs`.

For other devices, you need to change the passwords manually.

## Open ports

See the list of network ports that are listening to `[0.0.0.0]` in the
[network ports](/uc-doc/contributors/network) page. Change the service
[configuration](/uc-doc/system/configuration_files) for services that do not need to be accessible.

## Limiting who can connect to Asterisk via IP addresses access control lists (ACLs)

As an additionnal security layer, you can also use ACLs on your trunk SIP templates and on your
endpoint SIP templates.

### Keywords

The usual way of defining ACLs for a PJSIP template is to use the `permit`/`deny` keywords. However,
wazo-confgend does not generate options in order in the PJSIP configuration file. This means that
sometimes the `permit` options appear before the `deny` and sometimes the reverse is true. To work
around this, it is possible and recommended to _only_ use the `permit` keyword along with
exclamation marks in order to both allow and exclude specific addresses, such as demonstrated in the
following examples.

### Allowing only certain IP addresses

```
permit = !0.0.0.0/0,10.20.30.0/24,1.2.3.4
```

The `permit` rule above would disallow traffic coming from everywhere except the `10.20.30.0/24`
network and the `1.2.3.4` IP address.

### Allowing all traffic but disallowing certain IP addresses

```
permit = 0.0.0.0/0,!10.20.30.0/24,!1.2.3.4
```

The `permit` rule above would allow traffic for everyone except the `10.20.30.0/24` network and the
`1.2.3.4` IP address.

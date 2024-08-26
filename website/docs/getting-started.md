---
sidebar_position: 2
id: getting-started
title: Getting started
description: Getting Started
slug: /getting-started
---

## Requirements

### Minimum

Here are the system minimum requirements if you just want to try out a Wazo Platform instance:

- CPU: 1 CPU is enough for a test server
- Memory: 2 GB of memory is a tight minimum for a test server
- Storage: 8 GB is comfortable for a test server, except if you plan to use large firmware files
  for physical phones.

### Production

Here are the expected resources for a small production installation of around 50 users:

- 2 CPU minimum
- 4 GB RAM minimum
- 50 GB storage minimum

## Procedure

To install the Unified Communication use case in an all-in-one setup, do the following steps:

1. Install a Debian 11 Bullseye system with a default locale with an UTF-8 charset.
2. Run the following commands as root on the Debian system to provision sudo, git and Ansible:

   ```shell
   apt update
   apt install -yq sudo git ansible curl
   ```

   **Note:** Ansible is a suite of software tools that enables infrastructure as code. It is
   open-source and the suite includes software provisioning, configuration management, and
   application deployment functionality. https://en.wikipedia.org/wiki/Ansible_(software)

3. Extract the Wazo Platform installer

   ```shell
   git clone https://github.com/wazo-platform/wazo-ansible.git
   cd wazo-ansible
   ```

4. (optional) By default, Wazo Platform will install the development version. To install the latest
   stable version

   ```shell
   ansible_tag=wazo-$(curl https://mirror.wazo.community/version/stable)
   git checkout $ansible_tag
   ```

5. Install the Wazo Platform installer dependency

   ```shell
   ansible-galaxy install -r requirements-postgresql.yml
   ```

6. Edit the file `inventories/uc-engine` to add your preferences and passwords. The various
   variables that can be customized are described at https://github.com/wazo-platform/wazo-ansible/blob/master/README.md#variables

   By default, Wazo Platform will install the development version. To install the latest stable
   version, activate the following settings in `inventories/uc-engine`:

   ```ini
   [uc_engine:vars]
   wazo_distribution = pelican-bullseye
   wazo_distribution_upgrade = pelican-bullseye
   ```

   If you want to install the web user interface, activate the following in your
   `inventories/uc-engine`:

   ```ini
   [uc_ui:children]
   uc_engine_host
   ```

   The following variables allow you to create the `root` account at installation time, to be able
   to use the web user interface and an API user to be able to use the REST APIs:

   ```ini
   [uc_engine:vars]
   engine_api_configure_wizard = true
   engine_api_root_password = <YOUR_ROOT_PASSWORD>
   api_client_name = <YOUR_API_USERNAME>
   api_client_password = <YOUR_API_PASSWORD>
   ```

   Note: this API user will only have permissions for configuration REST API (wazo-confd).

7. Launch the installation by running the following command:

   ```shell
   ansible-playbook -i inventories/uc-engine uc-engine.yml
   ```

8. Once the installation completed, execute the following command to verify that all the Wazo
   services (wazo-plugind, wazo-webhookd, ...) are up and running:
   ```shell
   wazo-service status
   ```

## Use the REST API

You may now use the REST API from outside your system (here `wazo.example.com`).

1. Get an authentication token for 1 hour:

   Execute from the Debian system:

   ```shell
   wazo-auth-cli token create --auth-user <YOUR_API_USERNAME> --auth-password <YOUR_API_PASSWORD>
   ```

   Or with `curl` from anywhere:

   ```shell
   curl -k -X POST -u <YOUR_API_USERNAME>:<YOUR_API_PASSWORD> -H 'Content-Type: application/json' -d '{"expiration": 3600}' https://wazo.example.com/api/auth/0.1/token
   ```

2. Use any REST API you want.

   Note: You must replace `<YOUR_TOKEN>` with the authentication token

   To obtain the version of Wazo:

   ```shell
   curl -k -X GET -H 'X-Auth-Token: <YOUR_TOKEN>' -H 'Content-Type: application/json'  https://wazo.example.com/api/confd/1.1/infos
   ```

   To list the telephony users configured on the system:

   ```shell
   curl -k -X GET -H 'X-Auth-Token: <YOUR_TOKEN>' -H 'Content-Type: application/json' https://wazo.example.com/api/confd/1.1/users
   ```

## Optional post-install steps

You may now follow the [optional post-install steps](post-installation).

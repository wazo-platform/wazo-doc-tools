---
title: CSV Import and Export
---

## CSV Import

Users can be imported and associated to other resources by use of a CSV file. CSV Importation can be
used in situations where you need to modify many users at the same in an efficient manner, or for
migrating users from one system or tenant to another. A CSV file can be created and edited by
spreadsheet tools such as Excel, LibreOffice/OpenOffice Calc, etc.

### CSV file

The first line of a CSV file contains a list of field names (also sometimes called "columns"). Each
new line afterwards are users to import. CSV data must respect the following conditions:

- Files must be encoded in UTF-8
- Fields must be separated with a `,`
- Fields can be optionally quoted with a `"`
- Double-quotes can be escaped by writing them twice (e.g. `Robert ""Bob"" Jenkins`)
- Empty fields or headers that are not defined will be considered null.
- Fields of type `bool` must be either `0` for false, or `1` for true.
- Fields of type `int` must be a positive number

In the following tables, columns have been grouped according to their resource. Each resource is
created and associated to its user when all required fields for that resource are present.

#### User

| Field                                   | Type   | Required | Values                                      | Description                                                            |
| --------------------------------------- | ------ | -------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| `firstname`                             | string | Yes      |                                             | User's firstname                                                       |
| `lastname`                              | string |          |                                             | User's lastname                                                        |
| `email`                                 | string |          |                                             | User's email                                                           |
| `language`                              | string |          | `de_DE`, `en_US`, `es_ES`, `fr_FR`, `fr_CA` | User's language                                                        |
| `mobile_phone_number`                   | string |          |                                             | Mobile phone number                                                    |
| `outgoing_caller_id`                    | string |          |                                             | Customize outgoing caller id for this user                             |
| `enabled`                               | bool   |          |                                             | Enable/Disable the user                                                |
| `supervision_enabled`                   | bool   |          |                                             | Enable/Disable supervision                                             |
| `call_record_outgoing_external_enabled` | bool   |          |                                             | Enable/Disable all external calls made by this user                    |
| `call_record_outgoing_internal_enabled` | bool   |          |                                             | Enable/Disable all internal calls made by this user                    |
| `call_record_incoming_external_enabled` | bool   |          |                                             | Enable/Disable all external calls received by this user                |
| `call_record_incoming_internal_enabled` | bool   |          |                                             | Enable/Disable all internal calls received by this user                |
| `call_transfer_enabled`                 | bool   |          |                                             | Enable/Disable call transfers by DTMF                                  |
| `dtmf_hangup_enabled`                   | bool   |          |                                             | Enable/Disable hangup by DTMF                                          |
| `simultaneous_calls`                    | int    |          |                                             | Number of calls a user can have on his phone simultaneously            |
| `ring_seconds`                          | int    |          | A multiple of 5                             | Seconds a call ring before ending                                      |
| `call_permission_password`              | string |          |                                             | Overwrite all passwords set in call permissions associated to the user |
| `username`                              | string |          |                                             | User's username to log into applications                               |
| `password`                              | string |          |                                             | User's password to log into applications                               |
| `userfield`                             | string |          |                                             | A custom field which purpose is left to the client                     |
| `subscription_type`                     | int    |          |                                             | The subscription type for this user                                    |

#### Phone

| Field           | Type   | Required | Values            | Description                                                                                                    |
| --------------- | ------ | -------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `exten`         | string | Yes      |                   | Number for calling the user. The number must be inside the range of acceptable numbers defined for the context |
| `context`       | string | Yes      |                   | Context                                                                                                        |
| `line_protocol` | string | Yes      | sip, sccp, webrtc | Line protocol                                                                                                  |
| `sip_username`  | string |          |                   | SIP username                                                                                                   |
| `sip_secret`    | string |          |                   | SIP secret                                                                                                     |

#### Incoming call

| Field                 | Type   | Required | Values | Description                                                                                                                                                 |
| --------------------- | ------ | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `incall_exten`        | string | Yes      |        | Number for calling the user from an incoming call (i.e outside of Wazo). The number must be inside the range of acceptable numbers defined for the context. |
| `incall_context`      | string | Yes      |        | Context used for calls coming from outside of Wazo                                                                                                          |
| `incall_ring_seconds` | int    |          |        | Number of seconds a call will ring before ending                                                                                                            |

#### Voicemail

| Field                       | Type   | Required | Values | Description                                                |
| --------------------------- | ------ | -------- | ------ | ---------------------------------------------------------- |
| `voicemail_name`            | string | Yes      |        | Voicemail name                                             |
| `voicemail_number`          | string | Yes      |        | Voicemail number                                           |
| `voicemail_context`         | string | Yes      |        | Voicemail context                                          |
| `voicemail_password`        | string |          |        | A sequence of Voicemail password digits or #               |
| `voicemail_email`           | string |          |        | Email for sending notifications of new messages            |
| `voicemail_attach_audio`    | bool   |          |        | Enable/Disable attaching audio files to email message      |
| `voicemail_delete_messages` | bool   |          |        | Enable/Disable deleting message after notification is sent |
| `voicemail_ask_password`    | bool   |          |        | Enable/Disable password checking                           |

#### Call permissions

| Field              | Type   | Required | Values                             | Description                                         |
| ------------------ | ------ | -------- | ---------------------------------- | --------------------------------------------------- |
| `call_permissions` | string |          | list separated by semicolons (`;`) | Names of the call permissions to assign to the user |

### Importing a file

Once your file is ready, you can import it via `POST /users/import` to create all users in the
specified tenant using the `Wazo-Tenant` header.

#### Examples

The following example defines 3 users who each have a phone number. The first 2 users have a SIP
line, where as the last one uses SCCP:

```csv
firstname,lastname,exten,context,line_protocol
John,Doe,1000,ctx-<tenant slug>-internal-<UUID>,sip
George,Clinton,1001,ctx-<tenant slug>-internal-<UUID>,sip
Bill,Bush,1002,ctx-<tenant slug>-internal-<UUID>,sccp
```

The following example imports a user with a phone number and a voicemail:

```csv
firstname,lastname,exten,context,line_protocol,voicemail_name,voicemail_number,voicemail_context
John,Doe,1000,ctx-<tenant slug>-internal-<UUID>,sip,Voicemail for John Doe,1000,ctx-<tenant slug>-internal-<UUID>
```

The following exmple imports a user with both an internal and external phone number (e.g. incoming
call):

```csv
firstname,lastname,exten,context,line_protocol,incall_exten,incall_context
John,Doe,1000,ctx-<tenant slug>-internal-<UUID>,sip,2050,ctx-<tenant slug>-incall-<UUID>
```

## CSV Update

**Note**: The CSV update has been disabled since it does not support multi-tenants at the moment

The field list for an update is the same as for an import with the addition of the column uuid,
which is mandatory. For each line in the CSV file, the updater goes through the following steps:

1. Find the user, using the uuid
2. For each resource (line, voicemail, extension, etc) find out if it already exists.
3. If an existing resource was found, associate it with the user. Otherwise, create it.
4. Update all remaining fields

The following restrictions must also be respected during update:

- Columns that are not included in the CSV header will not be updated.
- A field that is empty (i.e, "") will be converted to NULL, which will unset the value.
- A line's protocol cannot be changed (i.e you cannot go from "sip" to "sccp" or vice-versa).
- An incall cannot be updated if the user has more than one incall associated.

Updating is done through the `PUT /users/import` endpoint

## CSV Export

CSV exports can be used as a scaffold for updating users, or as a means of importing users into
another system or tenant. An export will generate a CSV file with the same list of columns as an
import, with the addition of `uuid` and `provisioning_code`, for all users in the specified tenant.

Exports are done through the `GET /users/export`

---
title: 'Push Notifications'
---

- [Configuring push notifications](#configuring-push-notifications)
  - [Configuring FCM support](#configuring-fcm-support)
  - [Configuring APNS support](#configuring-apns-support)
- [Push notification types](#push-notification-types)
- [Triggering push notifications through the API](#triggering-push-notifications-through-the-api)

The Wazo Platform can generate push notifications for mobile users, through the wazo-webhookd
component.

See [wazo-webhookd documentation page](/uc-doc/system/wazo-webhookd) for more details on the
wazo-webhookd architecture.

## Configuring push notifications

For push notifications to be supported, at least one of the supported push notification service must
be configured.

Currently, the supported push notification services are Firebase Cloud Messaging (FCM) for Android
clients, and Apple Push Notification Service (APNS) for iOS clients.

### Configuring FCM support

Note: [Since release 24.07](/uc-doc/upgrade/upgrade_notes#24-07), wazo-webhookd supports FCM HTTP
API v1, deprecating support for legacy APIs.

The configuration procedure is as follow:

1. **create a Firebase project and enable Firebase Cloud Messaging API support**  
   To support relaying notifications to Android mobile users through FCM service, one must first
   have an active Firebase project account with Firebase Cloud Messaging support enabled for that
   FCM project.  
   See [Official Firebase documentation](https://firebase.google.com/docs/web/setup/#create-project)
   for more information.
2. **create a service account in the Firebase project**  
   With a Firebase project account and FCM API enabled, a service account must be created in the
   project; That service account will be used by wazo to authenticate to Firebase APIs.  
   See
   [Google Cloud service account documentation](https://cloud.google.com/iam/docs/service-accounts-create?hl=en)
   for more information;
3. **download the service account json credentials file**  
   A JSON file containing the service account credentials can be downloaded from the Firebase
   console;  
   See
   [Firebase documentation](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments).
4. **create or update the external mobile config in wazo-auth, providing the content of the
   downloaded service account credentials**  
   Using the wazo-auth REST API, the endpoint `/0.1/external/mobile/config` is used to manage the
   configuration for mobile push notifications support;
   - `POST` on that endpoint will create a fresh configuration if none exist, and `PUT` will allow
     updating the fields of that configuration;
   - the `fcm_service_account_info` field must be filled with the content of the downloaded json
     file from step 3(as a json string);
   - the `fcm_sender_id` is also required and should be the FCM project number assigned to the
     project, as shown in the Firebase console;  
     see the
     [API reference](/documentation/api/authentication.html#tag/external/paths/~1external~1%7Bauth_type%7D~1config/post)
     for more details on that endpoint.

### Configuring APNS support

To support push notifications to iOS devices, the requirements and procedure are similar to FCM
support. An Apple developer account is required.  
This account is used to register an Apple app(the mobile client), which support push
notifications.  
A certificate is generated for that app, and is provided to the Wazo Platform stack for
authentication to APNS when delivering the push notifications.

1. **Enroll in the Apple developer program**  
   To provide push notifications to a mobile client on an iOS device, an Apple developer account is
   required See
   [Apple documentation](https://developer.apple.com/support/app-account/#organization);
2. **Register an app**  
   An app corresponding to the iOS mobile client should be registered
3. **Enable push notification support for the app**  
   Push notifications through APNS must be enabled for the registered app; See
   [Apple documentation](https://developer.apple.com/documentation/usernotifications/registering-your-app-with-apns);
4. **Generate certificates for the app**  
   A VoIP services certificate tied to the registered Apple app must be generated to secure the
   connection between the Wazo Platform stack and the APNS servers;  
   See
   [Apple documentation on this subject](https://developer.apple.com/documentation/usernotifications/establishing-a-certificate-based-connection-to-apns);
   See also
   [more Apple documentation on creating a certificate for your Apple app](https://developer.apple.com/help/account/create-certificates/create-voip-services-certificates)
5. **Create or update the external mobile config in wazo-auth, providing the certificate content**  
   An external credential configuration of type `mobile` must be created in the Wazo Platform stack,
   through which the previously generated certificate can be provided.  
   In the **wazo-auth** REST API, the endpoint `/0.1/external/mobile/config` is used to manage the
   configuration for mobile push notifications support;
   - `POST` on that endpoint will create a fresh configuration if none exist, and `PUT` will allow
     updating the fields of that configuration;
   - the `ios_apn_certificate` field must be filled with the content of the public part of the
     certificate created in step 4;
   - the `ios_apn_private` field must be filled with the certificate signing request created in step
     4;  
     see the
     [API reference](/documentation/api/authentication.html#tag/external/paths/~1external~1%7Bauth_type%7D~1config/post)
     for more details on that endpoint.

## Push notification types

Here are the push notification types which are currently generated by the wazo platform.

- `incomingCall`: a user-facing push notification to notify that the user is currently receiving a
  call, which they have a chance to answer;
  - the notification data includes call event data, such as Caller ID;
- `missedCall`: a user-facing push notification to notify that a call has been received and was not
  answered by the user(whether an automatic forward has occured or not);
  - the notification title indicates that there is a new missed call, and the notification body
    specifies the name and number of the caller;
  - the notification data includes call event data, such as Caller ID name and number;
- `voicemailReceived`: a user-facing push notification to notify that a voicemail has been left in
  the user's mailbox;
  - the notification title indicates that there is a new voicemail, and notification body includes
    the Caller ID of the voicemail author (caller);
  - the notification data includes the voicemail event data;
- `messageReceived`: a user-facing push notification which indicates to the user that a chat message
  has been sent to(and received by) them;
  - the notification title will be the alias of the sender, and the body will be the content of the
    message; the notification data includes message event data;
- `cancelIncomingCall`: a data-only push notification which tells the mobile app to ignore a
  previous `incomingCall` notification, and to cancel any action started as a result of that
  `incomingCall`;
  - the notification data includes call cancel event data;

## Triggering push notifications through the API

The push notification mechanism can be used through wazo-webhookd REST API, and its python client
library wazo-webhookd-client. This makes it possible to tell wazo-webhookd to trigger arbitrary
custom push notifications at will, instead of only in reaction to internal platform events.

The endpoint `/1.0/mobile/notifications` is available through the REST API. `POST`ing to this
endpoint tells wazo-webhookd to create a push notification and send it to a specific user. That user
is required to have an active mobile session registered with the Wazo stack.

For example:

```shell

curl -X POST -H "X-Auth-Token: $token" -H "Content-Type: application/json" -H "Wazo-Tenant: $tenant_uuid" \
-d '{"title": "Example notification", "body": "This is an example notification", "notification_type": "exampleNotification", "extra": {"mykey": "myvalue"}, "user_uuid": "123e4567-e89b-12d3-a456-426614174000"}' \
'https://mystack.example.com/api/wazo-webhookd/1.0/mobile/notifications'
```

Here you need to substitute

- `$token`: an authentication token with appropriate permissions,
- `$tenant_uuid`: the uuid of the tenant of the user being targeted
- `"123e4567-e89b-12d3-a456-426614174000"`: the uuid of the user being targeted

See [the wazo-webhookd API reference](/documentation/api/webhook.html#tag/notifications) for more
details.

Alternatively, this API is also available through our wazo-webhookd-client python library:

```python
from wazo_webhookd_client import Client as WebhookdClient
from wazo_auth_client import Client as WazoAuthClient

# need an authentication token from wazo-auth
admin_username = ...
admin_password = ...
auth_client = WazoAuthClient(
   host='127.0.0.1',
   port=9497,
   prefix=None,
   https=False,
   username=admin_username,
   password=admin_password,
)
token = auth_client.token.new()

# tenant_uuid of the user
tenant = ...

webhookd_client = WebhookdClient(
   host'127.0.0.1',
   port=9300,
   prefix=None,
   https=False,
   token=token,
   tenant=tenant,
   **kwargs,
)

# user_uuid of the targeted user
user_uuid = ...

# the push notification parameters
test_notification = {
   'notification_type': "exampleNotification",
   'title': 'Example notification',
   'body': 'This is an example notification',
   'user_uuid': user_uuid,
   'extra': {
      'mykey': 'myvalue'
   },
}
webhookd.mobile_notifications.send(test_notification)
```

The user `user_uuid` will receive push notification on his registered mobile sessions(if any exist).

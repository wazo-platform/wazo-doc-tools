---
title: Stock Plugins Documentation
---

## wazo_user

Backend name: `wazo_user`

Purpose: Authenticate a user created by wazo-auth. These users do not map to telephony users at the
moment.

Note that email addresses and usernames are interchangeable: a user can login with a username /
password credential or with a email / password credential. As a consequence, a username or an email
must be unique among all usernames and emails, in order for wazo-auth to identify a user uniquely.
Furthermore, usernames and emails are case-insensitive. This makes it impossible to have a user A
with username `bob@example.com` and a user B with an email address `Bob@example.com`. In case of
conflict, the first user with a matching email address will be logged in.

## LDAP {#auth-backends-ldap}

Backend name: `ldap_user`

Purpose: Authenticate with an LDAP user. In this case, the LDAP server is used to authenticate while
wazo-auth is used to identify. This means that an LDAP user must match a user present in wazo-auth.

Note that email addresses and usernames are interchangeable: a user can login with a username /
password credential or with a email / password credential. As a consequence, a username or an email
must be unique among all usernames and emails, in order for wazo-auth to identify a user uniquely.
In case of conflict, the first wazo-auth user with a matching email address will be logged in.

wazo-auth ignores the case of the email addresses on both the LDAP server and on wazo-auth. This
means that if we have multiple users that match the email address fetched from the LDAP server, the
first user found on wazo-auth's side will be used.

The LDAP backend is configured for each tenant through a
[wazo-auth REST API endpoint](/documentation/api/authentication.html#operation/updateLDAPBackendConfig).

For example, with the given configuration:

```json
{
  "host": "example.org",
  "port": 389,
  "bind_dn": "cn=wazo,dc=example,dc=org",
  "bind_password": "bindpass",
  "user_base_dn": "ou=people,dc=example,dc=org",
  "user_login_attribute": "uid",
  "user_email_attribute": "mail"
}
```

### Service bind authentication flow {#service-bind-authentication-flow}

When an authentication request is received for username `alice`, password `userpass` and a tenant
`my-tenant`, the backend will:

1. The LDAP configuration is searched for the given tenant.
2. Connect to the LDAP server at example.org
3. Do an LDAP "bind" operation with bind DN `cn=wazo,dc=example,dc=org` and password `bindpass`
4. Do an LDAP "search" operation to find an LDAP user matching `alice`, using:
   - the base DN `ou=people,dc=example,dc=org`
   - the default filter `{user_login_attribute}={username}`, which in this case gives `(uid=alice)`
   - a SUBTREE scope
5. If the search returns exactly 1 LDAP user, do an LDAP "bind" operation with the user's DN and the
   password `userpass`
6. If the LDAP "bind" operation is successful, search in wazo-auth a user with an email matching the
   `mail` attribute of the LDAP user. Since Wazo Platform 22.12, the search will fail if the user in
   wazo-auth has upper-case characters in the email address.
7. If a wazo-auth user is found, success

### No service bind authentication flow

The backend can also work in a "no search" mode, for example with the following configuration:

```json
{
  "host": "example.org",
  "port": 389,
  "protocol_security": null,
  "protocol_version": 3,
  "bind_dn": null,
  "bind_password": null,
  "user_base_dn": "ou=people,dc=example,dc=org",
  "user_login_attribute": "uid",
  "user_email_attribute": "mail"
}
```

When the server receives the same authentication request as the service bind authentication flow, it
will fetch the LDAP configuration for the tenant and directly do an LDAP "bind" operation using the
DN `uid=alice,ou=people,dc=example,dc=org` and password `userpass`. The flow then continues at
step 6.

**Note**: User's email and voicemail's email are two separate things. This plugin only use the
user's email.

### Search filters

In the LDAP configuration API, you may have noticed a field named `search_filters`. This field is
only useful when using the [service bind authentication flow](#service-bind-authentication-flow).

The default filter is `{user_login_attribute}={username}`. This allows a simple search that matches
the `user_login_attribute` defined in the tenant's LDAP configuration. `username` comes from the
authentication request. In the example above, the search filter variables would be substituted as
such: `uid=alice`.

**It is important that the search filter allows for only _one_ result**, otherwise wazo-auth will
return a 401. It this thus fair to say that the `{user_login_attribute}={username}` filter should
always be in the filter and that any filter must be built upon it.

Of course, using more complex filters is possible and that is exactly why this feature exists. For
example, you may want to limit what kind of person can log in to wazo-auth. In our example, consider
the `objectClass` for an end user to be `person`. We could then use the following filter:
`(&({user_login_attribute}={username})(objectClass=person))`.

### Configuration

Each tenant has an LDAP configuration. It is not possible for now to have more than one configured
LDAP server (or domain) for a tenant. If you want to do so, it must be done through the LDAP server
itself.

### Explanation behind the `domain_name` field

When creating a token using the LDAP backend, it is necessary to provide a `domain_name` in order to
determine the tenant. Once the tenant is determined, the Wazo server can contact the LDAP server
configured in the tenant in order to verify the credentials.

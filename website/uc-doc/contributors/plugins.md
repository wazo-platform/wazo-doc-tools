---
title: Plugins
---

This section cover the preferred way to extend the functionalities of a Wazo server. There are many
extension point in Wazo, all of them can be used in combination to add complete features to you
favorite PBX.

## What is a plugin {#what-is-a-plugin}

A plugin is a set of additions made to a custom Wazo installation to add a new functionality.

## What can be done with a plugin {#what-can-be-done-with-a-plugin}

Wazo plugins allow a third party to add almost anything to Wazo. Most of our services have extension
points that can be used together to create a complete feature as a plugin.

Here's a non exhaustive list of what can be done with plugins

- Add configuration files to wazo services in `/etc/*/conf.d/`
- Add configuration files and dialplan files to Asterisk
- Reload services to complete the installation
- Extend wazo services using the available extension points

  - wazo-auth
  - wazo-calld
  - wazo-dird
  - wazo-confd
  - wazo-confgend

## Creating a plugin {#creating-a-plugin}

A plugin has the following structure:

- `wazo/plugin.yml`
- `wazo/rules`

### plugin.yml {#plugin-yml}

The `plugin.yml` file contains all the metadata of plugin. It should contains the following fields:

- `description`: The description of the plugin
- `name`: The name of the plugin
- `namespace`: An identifier for the author of the plugin
- `version`: The version of the plugin
- `plugin_format_version`: The version of the plugin specification implemented by this plugin.
- `depends`: Other plugins which this plugin depends on
- `debian_depends`: Debian packages which this plugin depends on

Example:

```yaml
name: foobar
namespace: foocorp
version: 0.0.1
description: This plugin adds some foo to your Wazo
plugin_format_version: 1
depends:
  - name: foobaz
    namespace: foocorp
  - name: admin-ui-context
    namespace: official
debian_depends:
  - golang-go
```

### rules {#rules}

The [rules](/uc-doc/contributors/plugins#contribs-plugins) file is an executable that will accept
the following commands

- build
- package
- install
- uninstall
- postrm

### Hello World {#hello-world}

This example will create a plugin that adds an extension `***42` that says `Hello World` when
called.

`wazo/plugin.yml`:

```yaml
namespace: demo
name: helloworld
description: Adds the extension "***42" to you dialplan to greet users
version: 0.0.1
plugin_format_version: 0
```

`wazo/rules`:

```shell
#!/bin/sh

case "$1" in
    build)
        ;;
    package)
        mkdir -p ${pkgdir}/etc/asterisk/extensions_extra.d
        cp helloworld.conf ${pkgdir}/etc/asterisk/extensions_extra.d/
        ;;
    install)
        asterisk -x 'dialplan reload'
        ;;
    uninstall)
        ;;
    *)
        echo "$0 called with unknown argument '$1'" >&2
        exit 1
        ;;
esac
```

`helloworld.conf`:

```ini
[xivo-extrafeatures]
exten = ***42,1,Playback(hello-world)
same = n,Return()
```

## Plugin format version {#plugin-format-version}

### 0 (default) {#default}

A plugin in version `0` should implement the following requirements:

- an executable name `wazo/rules` that returns `0` on success for the following commands:
  - build
  - package
  - install
  - uninstall

### 1 (recommended) {#recommended}

Version `1` adds support for the postrm instruction in the rules file.

## rules commands {#contribs-plugins}

- build: The `build` command is used to compile or generate files that will be included in the
  package.
- package: The `package` command is used to copy all files required by the plugin in the `<pkgdir>`
  directory.

  - The `pkgdir` environment variable holds the prefix that will be used to build the package. If
    the plugin needs to install a file in `/etc/foo/bar` do the following commands

    ```shell
    mkdir -p ${pkgdir}/etc/foo
    cp bar ${pkgdir}/etc/foo/bar
    ```

- install: The `install` command is used at the end of the installation to execute instructions that
  are usually not related to the file system. It will be used as the
  [postinst of the generated debian package](https://www.debian.org/doc/manuals/maint-guide/dother.en.html#maintscripts).
- uninstall: The `uninstall` command is used before the debian package is removed. It will be used
  as the
  [prerm of the generated debian package](https://www.debian.org/doc/manuals/maint-guide/dother.en.html#maintscripts).
- postrm (added in version 1): The `postrm` command is used at the end of the debian package
  removal. It will be used as the postrm of the generated debian package.

## Dependencies {#dependencies}

There are 2 kinds of dependencies that can be added on a plugin, _depends_ and _debian_depends_.

### depends {#depends}

The `depends` section of the `plugin.yml` file contains dependencies that are other plugins built
for wazo-plugind. Those dependencies should be already installed or available on the market.

There's no version requirements for this kind of dependencies, they are used to make plugin
installation less of a hassle.

When installing a plugin if a dependency is already satisfied, the package will not be upgraded.

Example:

```gherkin
Given a plugin "A" depending on plugin "B".
Given "B" is already installed in an older version.
When installing "A".
Then "B" will not be upgraded.
```

`depends` also generate an entry in the `debian_depends` section.

### debian_depends {#debian-depends}

The `debian_depends` section of the `plugin.yml` file contains dependencies that will be added to
the debian control file. This means that the debian packages listed here will be installed during
the plugin installation. This also means that removing that dependency from the system will also
remove all plugins depending on it.

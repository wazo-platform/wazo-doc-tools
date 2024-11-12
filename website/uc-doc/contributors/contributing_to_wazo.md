---
title: How to contribute to the Wazo Platform
---

In order to contribute to the Wazo Platform you need to be able to retrieve the source code, edit
the code, try your changes and contribute the code to the Git repository.

## Getting the code {#getting-the-code}

The source code for the Wazo Platform is available on [GitHub](https://github.com/wazo-platform).
Our GitHub organization contains over 200 repositories. Finding the one you want to contribute can
be a daunting task.

The [Wazo developers page](https://developers.wazo.io/) can help you find which repository you
should be working on. [Asking for help](/uc-doc/contributors/contributing_to_wazo#asking-for-help)
is always an option when looking at the less popular corners of the source code.

You can then [clone](https://help.github.com/en/articles/cloning-a-repository) the desired
repositories on you hard drive and start coding.

## Editing the code {#editing-the-code}

Most of the Wazo Platform is written in Python, our code follows the
[PEP8](https://www.python.org/dev/peps/pep-0008/) conventions. You can use a tool such as
[flake8](https://flake8.pycqa.org/en/latest/) to validate that you code respects the standards. Some
repositories also include the appropriate configuration to check your code using the tox command
`tox -e linters`.

Respecting coding standards is not sufficient to warrant quality code. Your contribution should not
break any existing tests and when possible, it should add tests for the code you are adding. We use
3 kind of tests. Unittests, Integration tests and acceptance tests.

### Unittests {#unittests}

Unittests are small tests that exercise a function or method in your code. These tests should be
fast and should not depend on other services running on your system, such as a database. It should
also leave your environment in the same state, no files laying around.

You can execute unittests with the following command

```shell
tox -e py37
```

### Integration tests {#integration-tests}

Integration tests models a service under test as a black box with some interface. Those tests rely
on the public API of the service and make assertions based on the observed behavior of that API.
Those tests rely on docker and docker-compose to isolate the components under tests and their
dependencies. You can find the integration tests in the `integration_tests` directory of most
repositories. A tox environment "integration" should be available, allowing integration tests to be
run using the following command from the project root directory:

```shell
tox -e integration
```

If `tox` is not configured to execute integration tests, you can execute the following commands.

```shell
cd integration_tests
make test-setup
make test
```

For more details see [integration tests documentation](/uc-doc/contributors/integration-tests).

### Acceptance tests {#acceptance-tests}

Acceptance tests are longer tests that uses the Wazo to test a feature from end-to-end. These tests
are usually longer to execute and require a dedicated Wazo Platform. As a contributor you are not
expected to execute these tests if you are not contributing to them. Some of the acceptance tests
are automatic [wazo-acceptance](https://github.com/wazo-platform/wazo-acceptance) and other are
executed manually at the end of each sprint.

## Trying your code {#trying-your-code}

After writing your code and checking that it does not break any tests, you should try it. The
"easiest" way to do so is to use a virtual machine with a working engine. You should avoid testing
in a production environment to avoid outage for you and your users. To install your test engine
follow the [Installing the System](/uc-doc/installation/install-system) documentation.

Now that you have a test engine, you want to try your code on it. Before starting I suggest you make
a snapshot of your virtual machine to be able to come back to a clean install whenever needed. Then
you can use [wdk](https://github.com/wazo-platform/wazo-sdk) to update the code running on your test
platform.

The installation instructions for wdk are contained in its
[README](https://github.com/wazo-platform/wazo-sdk/blob/master/README.md) as well as its usage
instructions.

## Contributing your code {#contributing-your-code}

Once you are satisfied with your modifications, you can submit a
[pull request](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork). At this
point you should watch your pull request to see if anyone or anything comments on it and respond to
comments to eventually get your contribution merged.

## Asking for help {#asking-for-help}

The Wazo developers can be contacted on our
[MatterMost](https://mm.wazo.community/wazo-platform/channels/town-square) server.

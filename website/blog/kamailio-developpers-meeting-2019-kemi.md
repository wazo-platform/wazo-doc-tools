---
title: Kamailio developpers meeting 2019 - kemi framework
date: 2019-12-06
author: Mathias WOLFF
category: kamailio
tags: [wazo-platform, development, kamailio, kemi]
slug: kamailio-developpers-meeting-2019-kemi
status: published
---

![kamailio developpers event 2019](../static/images/blog/kamailio-dev-meeting-2019/kamailio_dev_event_2019.jpeg)

During 2 days, the [Kamailio](https://www.kamailio.org) developers (The well-known SIP proxy) met in Dusserdolf in the wonderful places of SipgateDE.

An important subject was approached in detail: KEMI (Kamailio Embedded Interface). KEMI start with the 5th Kamailio version.

KEMI is a framework allowing to use a language other than native language to program our Kamailio engine. With KEMI, we can use Javascript, LUA, Python, LUA, Ruby and Squirrel.

The advantages in the use of KEMI are numerous.

First of all, the use of a standard language used and well known by developers guarantees an enhanced code quality.

Also, learning Kamailio is quicker. Another essential advantage of KEMI is to use easily the CI / CD for agile development.
The unit, integration and deployment tests could be done easier.

Another main advantage brought by KEMI is to enrich the functionalities of programming given by languages as Python or LUA via librairies.

The performance of the framework is undeniable. The tests accomplished on impportant code sizes show that KEMI uning Python3 or LUA is as effective as the native language. With the usage of certain functions, performances can even be better notably by using LUAJIT.

Finally, there is an advantage for using KEMI in production : the update of the code done with KEMI does not require a restart or reload of the Kamailio engine. This allows a transparent update during production production without downtime.

Personally, I see a last advantage in the organization of the files bringing a better readability. The native code is particularly unreadable (even if Daniel developped plugins of syntax colouring for Vim, VSCode and Atom!)

KEMI allows Kamailio to enter in a new dimension, more productive, more maintainable and stretchier.

One of the new development rules adopted during this meeting concerns KEMI. Every new function must be available via KEMI.

The KEMI documentation of KEMI is available at : [https://kamailio.org/docs/tutorials/devel/kamailio-kemi-framework/](https://kamailio.org/docs/tutorials/devel/kamailio-kemi-framework/)

An example in Python is available in the [Kamailio github](https://github.com/kamailio/kamailio/blob/master/misc/examples/kemi/kamailio-basic-kemi-python.py).

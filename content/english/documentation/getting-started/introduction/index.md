---
title: "Tranactional emails"
meta_title: ""
description: ""
date: 2025-04-04T05:00:00Z
layout: getting-started
weight: 1
draft: false
---

## Getting started

### Transactional emails with EUmail

The purpose of Mandaa EUmail is to send transactional emails to end users or customers.

Transactional emails are often mails like for example:

- account activation
- order confirmations
- invoices
- delivery information
- account statements


These emails are usually sent to a single recipient and only as a result of some event that the user/customer has requested or as a part of a natural flow initiated by the customer/recipient.

Transactional emails will usually include some information specific to the user/customer and the situation and are thus different from marketing emails and newsletters that are rarely different except for maybe the customers name.

Transactional emails often provide some dedicated and usefull information to the recipient like for example:

- order number
- expected delivery date
- delivery location
- status or balance

But the emails also have a static part depending on the document type and that part will usually not change for the different recipients. The static part are for example introduction, logo, header and footer.

In order to deliver customised emails EUmail merges the email templates (that holds the static part) with merge data (variable part) that holds the recipient specific data into the final email.

The merge data is always provided in the API call to EUmail except when sending emails from EUmail editor using the demo data.

The template can be provided in the API call if you have your own or you can create it as a EUmail template in our visual editor or copy/paste the HTML email code into a HTML template using our user interface.

Most modern transactional emails are sent in HTML format which is why most email template design programs - and the EUmail editor - outputs the template in HTML format.

EUmail currently only support emails in HTML format although the email standard does allow for emails to be in raw text format.

### Continue reading

Read more about

- [EUmail templates](/documentation/templates/eumail_templates/)
- [HTML templates](/documentation/templates/html_templates/)
- [Dynamic templates](/documentation/templates/dynamic_templates/)
- [Eumail integration](/documentation/integrations/integrations-intro/)
- [How to send your first API email](/documentation/getting-started/first_email_via_api/)
- [EUmail send API](https://mandaa.io/apidoc/index.html)

---



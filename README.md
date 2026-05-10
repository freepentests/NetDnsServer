# NetDnsServer

A minimal DNS server written entirely in Node.JS with no external libraries. The UDP server, packet builders, packet parsers, and packet serializers are written entirely from scratch, and you will not need any external dependencies to run this code.

This has only been tested on GNU/Linux and might not work on Windows, MacOS, or BSDs.

## How to Use

To use this DNS server, follow these steps in order:

1. Install Node.JS from the [official site](https://nodejs.org) *(recommended)* or via your desired package manager.

2. Clone this respository via the [Git](https://git-scm.com) command line utility.

3. Populate database.json with DNS records in the following form:

```json
{
    "TYPE": "A",
    "CLASS": "IN",
    "QNAME": "cloudflare.com",
    "RDATA": "1.1.1.1"
}
```

4. Update your system's settings to use the custom DNS server. On GNU/Linux (and probably BSD and MacOS too) you can do this by editing `/etc/resolv.conf`. On Windows, you'll have to figure it out yourself, because I've not used that spyware in years so I'm not familiar with it.

5. Once you've done all that, visit a site and it will probably work if you've done everything correctly.


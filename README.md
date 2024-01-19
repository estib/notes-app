
# Notes App

This is an app for taking notes. It stands as an example of...

- a simple [TypeScript](https://www.typescriptlang.org/) frontend written with [React](https://react.dev/) and [ReactRouter](https://reactrouter.com/en/main) that speaks to...
- a basic API written with [Express JS](https://expressjs.com/) that does CRUD operations on...
- a tiny [sqlite](https://www.sqlite.org/index.html) database

If you would like to see this app in action, you can either [request access to a hosted version via this link](https://forms.gle/S3TC22WzP7RFiAH27), or you can deploy it yourself (instructions for both [local](#Locally) and [AWS](#In-AWS) deployments are below). 

# Notable Features

* In the "Search" bar, you can filter down to notes that contain a given string in either the name or content of the note. This search functionality gives an example of server-side filtering. 
* You can add tags to your notes as a way of indexing them by important strings (e.g, "client:Sally"). You can then filter to notes with a given tag in the "Filter by Tag" field. This tag filtering functionality gives an example of client-side filtering. 
* [Markdown formatting](https://commonmark.org/help/) is supported in note content. 

# Limitations / Planned Features

The current version of the notes app has several important limitations:

1. HTTPS is not yet supported (:scream:). The app author intends to add a proper [NGINX](https://www.nginx.com/) web server with HTTPS support via [LetsEncrypt](https://letsencrypt.org/) in the near future. 
2. Authentication: there currently is none (:lol:). The app author intends to add users and user authentication in the future. 
3. Notes have a minimum of 20 characters, and a maximum of 300 characters (o_O). That's an arbitrary limit for Reasons (TM) that will likely change in the future. 

# Feature Requests

If you would like to submit a feature request or report a problem, please open an issue on this repo. 

# How to deploy

## In AWS

### Dependencies

To deploy this app in AWS, you must have an AWS account with sufficient permissions to create a VPC, Subnet, Security Group, EC2 instance, and Key Pairs.

You must also install [terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) and [configure an AWS profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) that terraform can use to authenticate with your AWS account. 

### Deploying

To deploy this app in your AWS account, clone this repo. Then...

1. In the `./deploy/vpn` directory, update the values in `main.tf`. Then run `terraform apply`. 
3. In the `/.deploy/instance` directory, update the values in `main.tf`. Then run `terraform apply`. 
4. When the apply completes, find the link for the note app in the terraform outputs and visit that link from your browser. 

These terraform modules use submodules from the [estib/sandbox/cloud module](https://registry.terraform.io/modules/estib/sandbox/cloud/latest). 

## Locally

### Dependencies

Install the following tools as appropriate for your operating system:

- [Node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/)

### npm libraries

Clone this repo. In the repo's backend directory, run `npm install` to install the following npm libraries:

```
cors
express
sqlite3
```

In the repo's frontend directory, run `npm install` to install the following npm libraries:

```
react-router-dom 
axios
react-markdown
```

### Deploying

Finally, from the repo's root directory, run `docker-compose up`. 

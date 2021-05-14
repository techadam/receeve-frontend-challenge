# Code Challenge

## Intro

re:ceeve automates debt collection using machine learning algorithms.

So far everything has been working flawlessly, clients are using our public API to create accounts and claims, and we take care of the rest.

An account contains information about the person that owns the debt.
A claim is an actual debt to pay.

One account may contain multiple claims.
A claim belongs to a single account.
##  Your mission, should you choose to accept it

Recently, one of our very satisfied clients asked us to implement a user interface to display all the accounts and claim information that they created, using our API, because not all the employees know how to query APIs.

Sadly our designer doesn't come back until next week, so we will also need your design skills to build the first version of the app

The navigation bar should have two entries
* Dashboard: Visual representation or charts that help them understand the performance of our software collecting debt.
* Accounts: Display the full list of the accounts. You should be able to go to the details of one of them, see the list of amounts and identifiers of the claims that belong to that specific account, along with all the personal information.

The agents using the app would like to share between them links pointing to a specific account, I'm not sure if this is possible, you're the expert

Our backend team has been kind enough to provide us with mock data, so you know already what the real API will look like once they are done building it. They told us that all amounts are in cents, so if you see `100` it actually means 1 euro. They did it to avoid loss of precision and simplify calculations. Make sure when you display it to the end-user that they are formatted correctly.

## Extras

They didn't ask for it, but we really want to impress them... So if you have time to add some kind of authentication/login mechanism it would be really nice!


## Start!

```
npm install
npm run challenge
```

The following endpoints are available
```
http://localhost:9001/accounts
http://localhost:9001/claims
```

For more details about pagination and relationships, see [json-server docs](https://www.npmjs.com/package/json-server)

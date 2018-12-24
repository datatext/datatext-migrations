# Stork

[![Build Status](https://travis-ci.org/datatext/datatext-migrations.svg?branch=master)](https://travis-ci.org/datatext/datatext-migrations)

## Building

    yarn build

## Runtime configuration

Right the database connection is configured through the `DATABASE_URL` environment variable, that must describe the connection string under the form `postgres://<user>:<password>@<host>:<port>/<database>`.

## Running all tests

    yarn test

## Running only unit tests

    yarn unit

## Running only integration tests

   yarn integration-test

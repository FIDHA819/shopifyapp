# Shopify Announcement Banner App

## Overview

A Shopify App built with MERN Stack and Shopify Theme App Extensions.

The app allows merchants to create announcement banners from the Shopify Admin dashboard. The announcement is:

1. Saved in MongoDB for audit history.
2. Synced to Shopify Shop Metafields using the GraphQL Admin API.
3. Displayed on the storefront using a Theme App Extension.

## Features

* Shopify Admin Dashboard
* MongoDB Storage
* Shopify Metafield Synchronization
* Theme App Extension
* Storefront Announcement Banner
* Responsive UI

## Tech Stack

* React
* Node.js
* Express.js
* MongoDB
* Shopify GraphQL Admin API
* Shopify Theme App Extension

## Architecture

Admin Dashboard
↓
MongoDB
↓
Shopify Metafield
↓
Theme App Extension
↓
Storefront Banner

## How It Works

1. Merchant enters announcement text.
2. Text is stored in MongoDB with timestamp.
3. Backend updates Shopify Shop Metafield:

   * Namespace: my_app
   * Key: announcement
4. Theme App Extension reads:
   shop.metafields.my_app.announcement
5. Banner is displayed across storefront pages.

## Screenshots

Add screenshots of:

* Admin Dashboard
* MongoDB Collection
* Storefront Banner

## Author

Fidha Fathima

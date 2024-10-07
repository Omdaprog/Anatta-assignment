# Shopify Product Variant Fetcher

This project is a Node.js script that interfaces with Shopify's GraphQL API to fetch products based on the provided product name. It retrieves and displays the product variants sorted by price.

## Table of Contents

- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Example](#example)
- [Unit Tests](#unit-tests)
- [Notes](#notes)

## Requirements

- Node.js v14 or later
- Access to the Shopify store admin and storefront tokens

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/shopify-product-fetcher.git
    cd shopify-product-fetcher
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

This script fetches and lists the variants for a product based on the input name.

Run the script using the command:

```bash
node app.js --name "<product name>"

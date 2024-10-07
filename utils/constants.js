import dotenv from 'dotenv';
dotenv.config();

export const API_VERSION = "2024-04";
export const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
export const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
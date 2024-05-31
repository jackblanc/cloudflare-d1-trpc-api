/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    Client: {
      type: "sst.cloudflare.Worker"
      url: string
    }
    CloudflareAccountId: {
      type: "sst.sst.Secret"
      value: string
    }
    CloudflareApiToken: {
      type: "sst.sst.Secret"
      value: string
    }
    DatabaseId: {
      type: "sst.sst.Secret"
      value: string
    }
    Trpc: import("@cloudflare/workers-types").Service
    TrpcServerUrl: {
      type: "sst.sst.Secret"
      value: string
    }
  }
}
export {}
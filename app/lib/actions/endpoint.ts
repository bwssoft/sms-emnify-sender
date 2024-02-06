"use server"

import { revalidatePath } from 'next/cache';
import * as repository from '../repository';
import * as emnify from '../emnify';

export async function fetchEndpoints() {
  return await emnify.listEndpoints()
  // await new Promise<void>((resolve) => setTimeout(resolve, 2000))
  // return endpoints
}

export async function fetchEndpointById(id: string) {
  return await emnify.listEndpointById({ id })
  // await new Promise<void>((resolve) => setTimeout(resolve, 2000))
  // return endpoints[0]
}

export async function fetchEndpointConnectivityById(id: string) {
  return await emnify.listEndpointConnectivityById({ id })
  // await new Promise<void>((resolve) => setTimeout(resolve, 2000))
  // return connectivity
}

export async function fetchEndpointUsageById(id: string) {
  return await emnify.listEndpointUsageById({ id })
  // await new Promise<void>((resolve) => setTimeout(resolve, 2000))
  // return usage
}

export async function fetchEndpointMessagesById(id: string) {
  return await emnify.listEndpointMessagesById({ id })
  // await new Promise<void>((resolve) => setTimeout(resolve, 2000))
  // return messages
}

export async function fetchEndpointsFilteredByName(value: string, type?: string) {
  // return await emnify.listEndpointsFilteredByName({ name })
  return await repository.listFilteredSimcardByEndpointName({ value, type: type ?? "endpoint_name" })
  // await new Promise<void>((resolve) => setTimeout(resolve, 2000))
  // return endpoints.filter(el => el.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
}

export async function sendMessagefromMessagePage(params: { endpoint_id: string, url: string }, formData: FormData) {
  const { payload } = Object.fromEntries(formData.entries())
  const sms = await emnify.sendEndpointMessage({
    device_id: params.endpoint_id as string,
    payload: payload as string
  })
  if (!sms) return
  revalidatePath(params.url)
}

export async function sendMessagefromEndpointPage(device_id: string, formData: FormData) {
  const { payload } = Object.fromEntries(formData.entries())
  const sms = await emnify.sendEndpointMessage({
    device_id,
    payload: payload as string
  })
  if (!sms) return
  revalidatePath(`/message/check/${device_id}/${sms.sms_id}`)

}

export async function getMessagefromEndpoint(device_id: string, sms_id: string) {
  return await emnify.getEndpointMessage({
    device_id,
    sms_id
  })
  // await new Promise<void>((resolve) => setTimeout(resolve, 2000))
  // return messages[0]
}

export async function refreshMessageDatafromEndpoint({ device_id, sms_id }: { device_id: string, sms_id: string }) {
  // await new Promise<void>((resolve) => setTimeout(resolve, 2000))
  revalidatePath(`/message/check/${device_id}/${sms_id}`)
}
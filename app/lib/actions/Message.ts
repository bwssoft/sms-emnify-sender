"use server"

import { revalidatePath } from "next/cache"

export async function refreshMessageDatafromMessagePage(url: string) {
  revalidatePath(url)
}
export async function refreshMessageDatafromEndpointMessagePage({ device_id, sms_id }: { device_id: string, sms_id?: string }) {
  // await new Promise<void>((resolve) => setTimeout(resolve, 2000))
  revalidatePath(`/endpoint/${device_id}/message`)
}
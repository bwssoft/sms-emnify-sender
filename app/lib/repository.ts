import { auth } from "@/auth";
import { Client, Simcard } from "./definitions";
import clientPromise from "./mongodb";



export async function listUserByUsername(username: string): Promise<Client | undefined> {
  try {
    const client = await (await clientPromise).db("sms-emnify-sender").collection("client").findOne({ username })
    return client as unknown as Client;
  } catch (error) {
    throw new Error('Failed to list client.');
  }
}

export async function listUserByUUID(uuid: string): Promise<Client | undefined> {
  try {
    const client = await (await clientPromise).db("sms-emnify-sender").collection("client").findOne({ uuid })
    return client as unknown as Client;
  } catch (error) {
    throw new Error('Failed to list client.');
  }
}

export async function listSimcard(): Promise<Simcard[] | undefined> {
  try {
    const client = await (await clientPromise).db("sms-emnify-sender").collection("simcard").aggregate([{ $match: {} }]).toArray()
    return client as unknown as Simcard[];
  } catch (error) {
    throw new Error('Failed to list simcard.');
  }
}

export async function listFilteredSimcardByEndpointName({ name }: { name: string }): Promise<Simcard[]> {
  const session = await auth()
  try {
    const client = await (await clientPromise).db("sms-emnify-sender").collection("simcard").aggregate([{
      $match: {
        "emnify.endpoint_name": { $regex: name, $options: "i" },
        client_uuid: session?.user.uuid
      },
    }, {
      $limit: 20
    }, { $project: { _id: 0 } }]).toArray()
    return client as unknown as Simcard[];
  } catch (error) {
    throw new Error('Failed to list simcard.');
  }
}
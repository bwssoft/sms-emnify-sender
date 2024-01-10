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

export async function listFilteredSimcardByEndpointName({ value, type }: { value: string, type: string }): Promise<Simcard[]> {
  console.log([`emnify.${type}`])
  const session = await auth()
  try {
    const client = await (await clientPromise).db("sms-emnify-sender").collection("simcard").aggregate([{
      $match: {
        [`emnify.${type}`]: { $regex: value, $options: "i" },
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

export async function updateUser(data: Omit<Partial<Client>, 'uuid'>) {
  const session = await auth();

  try {
    const client = await 
      (await clientPromise)
      .db("sms-emnify-sender")
      .collection("client")
      .updateOne(
        {
          uuid: session?.user.uuid,
        }, 
        {
          $set: data
        }
      )

    return client as unknown as Client;
  } catch {
    throw new Error('Cant update user');
  }
}
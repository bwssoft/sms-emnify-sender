import { auth } from "@/auth";
import { Client, Command, Simcard } from "./definitions";
import clientPromise from "./mongodb";
import { Filter } from "mongodb";



export async function listUserByUsername(username: string): Promise<Client | undefined> {
  try {
    const client = await (await clientPromise).db("sms-emnify-sender").collection("client").findOne({ username })
    return client as unknown as Client;
  } catch (error) {
    throw new Error('Failed to list client.');
  }
}

export async function listFilteredSimcardByEndpointName({ value, type }: { value: string, type: string }): Promise<Simcard[]> {
  const session = await auth()
  try {
    const pre_match = {
      [`emnify.${type}`]: { $regex: value, $options: "i" },
    }
    const match = session?.user.role === "client" ? { ...pre_match, client_uuid: session?.user.uuid } : pre_match

    const simcards = await (await clientPromise)
      .db("sms-emnify-sender")
      .collection("simcard")
      .aggregate(
        [
          { $match: match },
          { $limit: 20 },
          { $project: { _id: 0 } }
        ]).toArray()

    return simcards as unknown as Simcard[];
  } catch (error) {
    throw new Error('Failed to list simcard.');
  }
}

export async function createCommand({ _id, readonly = false, ...data }: Command) {
  try {
    const commnadModel = (await clientPromise).db("sms-emnify-sender").collection<Command>("commands");
    const commandEntity = await commnadModel.insertOne({ readonly, ...data });
    return commandEntity.insertedId;
  }
  catch (error) {
    throw new Error('Failed to create command.');
  }
}

export async function listCommands(data?: Filter<Command>) {
  try {
    
    const commnadModel = (await clientPromise).db("sms-emnify-sender").collection<Command>("commands");

    const commandsEntity = await commnadModel.aggregate<Command>([
      {
        $match: {
          ...data
        }
      },
      {
        $limit: 20
      }, { $project: { _id: 0 } }
    ]).toArray();
    return commandsEntity;
  } catch (error) {
    throw new Error('Failed to list commands.');
  }
}

export async function findOneCommand(uuid: string) {
  try {
    const commnadModel = (await clientPromise).db("sms-emnify-sender").collection<Command>("commands");
    const commandEntity = await commnadModel.aggregate([
      {
        $match: {
          uuid
        }
      },
      {
        $limit: 1
      }
    ]).toArray()

    return { ...commandEntity[0], _id: commandEntity[0]._id.toString() };
  }
  catch (error) {
    throw new Error('Failed to find one command.');
  }
}

export async function updateCommand({ _id, ...data }: Partial<Command>) {
  try {
    const commnadModel = (await clientPromise).db("sms-emnify-sender").collection<Command>("commands");
    const response = await commnadModel.updateOne({
      uuid: data.uuid
    },
      {
        $set: data
      })

    return response;
  } catch (error) {
    throw new Error('Failed to update command.');
  }
}

export async function deleteCommand(uuid: string) {
  try {
    const commnadModel = (await clientPromise).db("sms-emnify-sender").collection<Command>("commands");
    const response = await commnadModel.deleteOne({
      uuid
    })

    return response;
  } catch (error) {
    throw new Error('Failed to delete command.');
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
"use server"

import { revalidatePath } from "next/cache"
import * as emnify from "./emnify"
import * as repository from "./repository"
import { redirect } from "next/navigation"
import { auth, signIn, signOut } from "@/auth"

import bcrypt from "bcrypt"
import { Command } from "./definitions"

export async function userAuthenticate(formData: FormData) {
  const { username, password } = Object.fromEntries(formData.entries())
  const result = await emnify.authenticate({ token: process.env.BWS_EMNIFY_AUTH_TOKEN })
  if (!result) return
  await signIn("credentials", {
    token: result.token,
    username,
    password
  })
}

export async function isAdm(): Promise<boolean> {
  const data = await auth()
  if(!data){
      return false
  }
  return data.user.role ===  'adm'
}

export async function userLogout() {
  try {
    await signOut({ redirectTo: "/login" });
  } catch (error) {
    throw error;
  }
}

export async function changeUserPassword(formData: FormData) {
  const { new_password } = Object.fromEntries(formData.entries())
  const hashPassword = await bcrypt.hash(new_password as string, 10)
  return await repository.updateUser({
    password: hashPassword
  })
}

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

export async function createCommandfromCoomandPage(data: Command) {
  const response = await repository.createCommand(data);
  revalidatePath('/command');
  return response;
}

export async function findOneCommandformComandPage(id: string) {
  const response = await repository.findOneCommand(id);
  return response;
}

export async function deleteCommandfromComandPage(id: string) {
  const response = await repository.deleteCommand(id);
  revalidatePath('/command');
  return response;
}

export async function updateCommandfromCommandPage(data: Partial<Command>) {
  const response = await repository.updateCommand(data)
  revalidatePath('/command');
  return response;
}

export async function listCommandsfromComandPage(value?: string, type?: string) {
  console.log(value, type)
  return await repository.listCommands({ type, value });
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

export async function refreshMessageDatafromMessagePage(url: string) {
  revalidatePath(url)
}
export async function refreshMessageDatafromEndpointMessagePage({ device_id, sms_id }: { device_id: string, sms_id?: string }) {
  // await new Promise<void>((resolve) => setTimeout(resolve, 2000))
  revalidatePath(`/endpoint/${device_id}/message`)
}

//MOCK
const endpoints: emnify.Endpoint[] = [
  {
    id: 1,
    name: "arduino01",
    tags: "arduino, meter, temp",
    created: "1970-01-01T00:00:00.000+0000",
    last_updated: "1970-01-01T00:00:00.000+0000",
    status: {
      id: 1,
      description: "Disabled",
    },
    service_profile: {
      id: 1,
      name: "Smart Meter",
    },
    tariff_profile: {
      id: 3,
      name: "Domestic only",
    },
    sim: {
      id: 788,
      iccid: "7368267364738977362",
      iccid_with_luhn: "73682673647389773621",
      imsi: "901991234567890",
      msisdn: "88563748761",
      status: {
        id: 2,
        description: "Suspended",
      },
    },
    imei: "864345678889321",
    ip_address: "10.203.23.75",
    ip_address_space: {
      id: 2,
    },
    imei_lock: true,
  },
  {
    id: 2,
    name: "arduino02",
    tags: "arduino, meter, temp",
    created: "1970-01-01T00:00:00.000+0000",
    last_updated: "1970-01-01T00:00:00.000+0000",
    status: {
      id: 1,
      description: "Disabled",
    },
    service_profile: {
      id: 1,
      name: "Smart Meter",
    },
    tariff_profile: {
      id: 3,
      name: "Domestic only",
    },
    sim: {
      id: 789,
      iccid: "7368267364738297362",
      iccid_with_luhn: "73682673647382973622",
      eid: "89049011803455664400026832111175",
      imsi: "901991234567891",
      msisdn: "88563748762",
      status: {
        id: 2,
        description: "Suspended",
      },
    },
    imei: "864345678897829",
    ip_address: "10.203.23.76",
    ip_address_space: {
      id: 2,
    },
    imei_lock: false,
  },
  {
    id: 3,
    name: "barduino03",
    tags: "arduino, meter, temp",
    created: "1970-01-01T00:00:00.000+0000",
    last_updated: "1970-01-01T00:00:00.000+0000",
    status: {
      id: 1,
      description: "Disabled",
    },
    service_profile: {
      id: 1,
      name: "Smart Meter",
    },
    tariff_profile: {
      id: 3,
      name: "Domestic only",
    },
    sim: {
      id: 789,
      iccid: "7368267364738297362",
      iccid_with_luhn: "73682673647382973622",
      eid: "89049011803455664400026832111175",
      imsi: "901991234567891",
      msisdn: "88563748762",
      status: {
        id: 2,
        description: "Suspended",
      },
    },
    imei: "864345678897829",
    ip_address: "10.203.23.76",
    ip_address_space: {
      id: 2,
    },
    imei_lock: false,
  },
]

const connectivity: emnify.Connectivity = {
  "status": {
    "description": "ONLINE"
  },
  "location": {
    "iccid": 8988303010000000000,
    "imsi": 901439999999999,
    "last_updated": "2019-12-03T07:06:04.000Z",
    "last_updated_gprs": "2019-12-30T14:55:35.000Z",
    "sgsn_number": 491770695700,
    "vlr_number": 491770940000,
    "msc": 491770940000,
    "operator": {
      "id": 4,
      "name": "EPlus",
      "country": {
        "id": 74,
        "name": "Germany"
      }
    },
    "country": {
      "country_id": 74,
      "name": "Germany",
      "country_code": 49,
      "mcc": 262,
      "iso_code": "de"
    },
    "sgsn_ip_address": "212.23.107.88"
  },
  "pdp_context": {
    "pdp_context_id": 92415,
    "endpoint_id": 166,
    "tariff_profile_id": 35,
    "tariff_id": 54,
    "ratezone_id": 70,
    "organisation_id": 2,
    "imsi_id": 627,
    "imsi": 901439999999999,
    "sim_id": 625,
    "teid_data_plane": 7116,
    "teid_control_plane": 7116,
    "gtp_version": 1,
    "nsapi": 5,
    "sgsn_control_plane_ip_address": "212.23.107.89",
    "sgsn_data_plane_ip_address": "212.23.107.89",
    "ggsn_control_plane_ip_address": "185.57.216.35",
    "ggsn_data_plane_ip_address": "185.57.216.35",
    "created": "2019-12-04T08:12:02.000Z",
    "mcc": 262,
    "mnc": 3,
    "operator_id": 4,
    "lac": 40217,
    "ci": null,
    "sac": 42937,
    "rac": null,
    "ue_ip_address": "10.199.5.223",
    "imeisv": 3526510721968301,
    "rat_type": {
      "rat_type_id": 1,
      "description": "3G"
    },
    "duration": "00:00:04"
  },
  "services": [
    "GPRS"
  ]
}

const usage: emnify.Usage = {
  "last_month": {
    "data": {
      "endpoint_id": 166,
      "month": "2019-11-01T00:00:00.000Z",
      "volume": "29.166235",
      "volume_tx": "5.577229",
      "volume_rx": "23.589006",
      "traffic_type_id": 5,
      "last_updated": "2019-11-30T14:56:25.000Z",
      "cost": "6.10483935",
      "currency_id": 1,
      "id": 311,
      "traffic_type": {
        "description": "Data",
        "unit": "MB",
        "id": 5
      },
      "currency": {
        "code": "EUR",
        "symbol": "€",
        "id": 1
      }
    },
    "sms": {
      "endpoint_id": 166,
      "month": "2019-11-01T00:00:00.000Z",
      "volume": "51.000000",
      "volume_tx": "36.000000",
      "volume_rx": "15.000000",
      "traffic_type_id": 6,
      "last_updated": "2019-11-26T10:52:42.000Z",
      "cost": "3.3200000000",
      "currency_id": 1,
      "id": 312,
      "traffic_type": {
        "description": "SMS",
        "unit": "SMS",
        "id": 6
      },
      "currency": {
        "code": "EUR",
        "symbol": "€",
        "id": 1
      }
    }
  },
  "current_month": {
    "data": {
      "endpoint_id": 166,
      "month": "2019-12-01T00:00:00.000Z",
      "volume": "0.848157",
      "volume_tx": "0.172846",
      "volume_rx": "0.675311",
      "traffic_type_id": 5,
      "last_updated": "2019-12-01T15:12:53.000Z",
      "cost": "0.2120392500",
      "currency_id": 1,
      "id": 435,
      "traffic_type": {
        "description": "Data",
        "unit": "MB",
        "id": 5
      },
      "currency": {
        "code": "EUR",
        "symbol": "€",
        "id": 1
      }
    },
    "sms": {
      "endpoint_id": 166,
      "month": "2019-12-01T00:00:00.000Z",
      "volume": "3.000000",
      "volume_tx": "2.000000",
      "volume_rx": "1.000000",
      "traffic_type_id": 6,
      "last_updated": "2019-12-01T14:20:42.000Z",
      "cost": "0.1700000000",
      "currency_id": 1,
      "id": 439,
      "traffic_type": {
        "description": "SMS",
        "unit": "SMS",
        "id": 6
      },
      "currency": {
        "code": "EUR",
        "symbol": "€",
        "id": 1
      }
    }
  },
  "last_hour": {
    "data": {
      "rx": [
        [
          "06:38",
          0
        ],
        [
          "06:39",
          0
        ],
        [
          "06:40",
          0
        ],
        [
          "06:41",
          0
        ],
        [
          "06:42",
          0
        ],
        [
          "06:43",
          0
        ],
        [
          "06:44",
          0
        ],
        [
          "06:45",
          0
        ],
        [
          "06:46",
          0
        ],
        [
          "06:47",
          0
        ],
        [
          "06:48",
          0
        ],
        [
          "06:49",
          0
        ],
        [
          "06:50",
          0
        ],
        [
          "06:51",
          0
        ],
        [
          "06:52",
          0
        ],
        [
          "06:53",
          0
        ],
        [
          "06:54",
          0
        ],
        [
          "06:55",
          0
        ],
        [
          "06:56",
          0
        ],
        [
          "06:57",
          0
        ],
        [
          "06:58",
          0
        ],
        [
          "06:59",
          0
        ],
        [
          "07:00",
          0
        ],
        [
          "07:01",
          0
        ],
        [
          "07:02",
          0
        ],
        [
          "07:03",
          0
        ],
        [
          "07:04",
          0
        ],
        [
          "07:05",
          0
        ],
        [
          "07:06",
          0
        ],
        [
          "07:07",
          0
        ],
        [
          "07:08",
          0
        ],
        [
          "07:09",
          0
        ],
        [
          "07:10",
          0
        ],
        [
          "07:11",
          0
        ],
        [
          "07:12",
          0
        ],
        [
          "07:13",
          0
        ],
        [
          "07:14",
          0
        ],
        [
          "07:15",
          0
        ],
        [
          "07:16",
          0
        ],
        [
          "07:17",
          0
        ],
        [
          "07:18",
          0
        ],
        [
          "07:19",
          0
        ],
        [
          "07:20",
          0
        ],
        [
          "07:21",
          0
        ],
        [
          "07:22",
          0
        ],
        [
          "07:23",
          0
        ],
        [
          "07:24",
          0
        ],
        [
          "07:25",
          0
        ],
        [
          "07:26",
          0
        ],
        [
          "07:27",
          0
        ],
        [
          "07:28",
          0
        ],
        [
          "07:29",
          0
        ],
        [
          "07:30",
          0
        ],
        [
          "07:31",
          0
        ],
        [
          "07:32",
          0
        ],
        [
          "07:33",
          0
        ],
        [
          "07:34",
          0
        ],
        [
          "07:35",
          0
        ],
        [
          "07:36",
          0
        ]
      ],
      "tx": [
        [
          "06:38",
          0
        ],
        [
          "06:39",
          0
        ],
        [
          "06:40",
          0
        ],
        [
          "06:41",
          0
        ],
        [
          "06:42",
          0
        ],
        [
          "06:43",
          0
        ],
        [
          "06:44",
          0
        ],
        [
          "06:45",
          0
        ],
        [
          "06:46",
          0
        ],
        [
          "06:47",
          0
        ],
        [
          "06:48",
          0
        ],
        [
          "06:49",
          0
        ],
        [
          "06:50",
          0
        ],
        [
          "06:51",
          0
        ],
        [
          "06:52",
          0
        ],
        [
          "06:53",
          0
        ],
        [
          "06:54",
          0
        ],
        [
          "06:55",
          0
        ],
        [
          "06:56",
          0
        ],
        [
          "06:57",
          0
        ],
        [
          "06:58",
          0
        ],
        [
          "06:59",
          0
        ],
        [
          "07:00",
          0
        ],
        [
          "07:01",
          0
        ],
        [
          "07:02",
          0
        ],
        [
          "07:03",
          0
        ],
        [
          "07:04",
          0
        ],
        [
          "07:05",
          0
        ],
        [
          "07:06",
          0
        ],
        [
          "07:07",
          0
        ],
        [
          "07:08",
          0
        ],
        [
          "07:09",
          0
        ],
        [
          "07:10",
          0
        ],
        [
          "07:11",
          0
        ],
        [
          "07:12",
          0
        ],
        [
          "07:13",
          0
        ],
        [
          "07:14",
          0
        ],
        [
          "07:15",
          0
        ],
        [
          "07:16",
          0
        ],
        [
          "07:17",
          0
        ],
        [
          "07:18",
          0
        ],
        [
          "07:19",
          0
        ],
        [
          "07:20",
          0
        ],
        [
          "07:21",
          0
        ],
        [
          "07:22",
          0
        ],
        [
          "07:23",
          0
        ],
        [
          "07:24",
          0
        ],
        [
          "07:25",
          0
        ],
        [
          "07:26",
          0
        ],
        [
          "07:27",
          0
        ],
        [
          "07:28",
          0
        ],
        [
          "07:29",
          0
        ],
        [
          "07:30",
          0
        ],
        [
          "07:31",
          0
        ],
        [
          "07:32",
          0
        ],
        [
          "07:33",
          0
        ],
        [
          "07:34",
          0
        ],
        [
          "07:35",
          0
        ],
        [
          "07:36",
          0
        ]
      ]
    },
    "sms": {
      "rx": [
        [
          "06:38",
          0
        ],
        [
          "06:39",
          0
        ],
        [
          "06:40",
          0
        ],
        [
          "06:41",
          0
        ],
        [
          "06:42",
          0
        ],
        [
          "06:43",
          0
        ],
        [
          "06:44",
          0
        ],
        [
          "06:45",
          0
        ],
        [
          "06:46",
          0
        ],
        [
          "06:47",
          0
        ],
        [
          "06:48",
          0
        ],
        [
          "06:49",
          0
        ],
        [
          "06:50",
          0
        ],
        [
          "06:51",
          0
        ],
        [
          "06:52",
          0
        ],
        [
          "06:53",
          0
        ],
        [
          "06:54",
          0
        ],
        [
          "06:55",
          0
        ],
        [
          "06:56",
          0
        ],
        [
          "06:57",
          0
        ],
        [
          "06:58",
          0
        ],
        [
          "06:59",
          0
        ],
        [
          "07:00",
          0
        ],
        [
          "07:01",
          0
        ],
        [
          "07:02",
          0
        ],
        [
          "07:03",
          0
        ],
        [
          "07:04",
          0
        ],
        [
          "07:05",
          0
        ],
        [
          "07:06",
          0
        ],
        [
          "07:07",
          0
        ],
        [
          "07:08",
          0
        ],
        [
          "07:09",
          0
        ],
        [
          "07:10",
          0
        ],
        [
          "07:11",
          0
        ],
        [
          "07:12",
          0
        ],
        [
          "07:13",
          0
        ],
        [
          "07:14",
          0
        ],
        [
          "07:15",
          0
        ],
        [
          "07:16",
          0
        ],
        [
          "07:17",
          0
        ],
        [
          "07:18",
          0
        ],
        [
          "07:19",
          0
        ],
        [
          "07:20",
          0
        ],
        [
          "07:21",
          0
        ],
        [
          "07:22",
          0
        ],
        [
          "07:23",
          0
        ],
        [
          "07:24",
          0
        ],
        [
          "07:25",
          0
        ],
        [
          "07:26",
          0
        ],
        [
          "07:27",
          0
        ],
        [
          "07:28",
          0
        ],
        [
          "07:29",
          0
        ],
        [
          "07:30",
          0
        ],
        [
          "07:31",
          0
        ],
        [
          "07:32",
          0
        ],
        [
          "07:33",
          0
        ],
        [
          "07:34",
          0
        ],
        [
          "07:35",
          0
        ],
        [
          "07:36",
          0
        ]
      ],
      "tx": [
        [
          "06:38",
          0
        ],
        [
          "06:39",
          0
        ],
        [
          "06:40",
          0
        ],
        [
          "06:41",
          0
        ],
        [
          "06:42",
          0
        ],
        [
          "06:43",
          0
        ],
        [
          "06:44",
          0
        ],
        [
          "06:45",
          0
        ],
        [
          "06:46",
          0
        ],
        [
          "06:47",
          0
        ],
        [
          "06:48",
          0
        ],
        [
          "06:49",
          0
        ],
        [
          "06:50",
          0
        ],
        [
          "06:51",
          0
        ],
        [
          "06:52",
          0
        ],
        [
          "06:53",
          0
        ],
        [
          "06:54",
          0
        ],
        [
          "06:55",
          0
        ],
        [
          "06:56",
          0
        ],
        [
          "06:57",
          0
        ],
        [
          "06:58",
          0
        ],
        [
          "06:59",
          0
        ],
        [
          "07:00",
          0
        ],
        [
          "07:01",
          0
        ],
        [
          "07:02",
          0
        ],
        [
          "07:03",
          0
        ],
        [
          "07:04",
          0
        ],
        [
          "07:05",
          0
        ],
        [
          "07:06",
          0
        ],
        [
          "07:07",
          0
        ],
        [
          "07:08",
          0
        ],
        [
          "07:09",
          0
        ],
        [
          "07:10",
          0
        ],
        [
          "07:11",
          0
        ],
        [
          "07:12",
          0
        ],
        [
          "07:13",
          0
        ],
        [
          "07:14",
          0
        ],
        [
          "07:15",
          0
        ],
        [
          "07:16",
          0
        ],
        [
          "07:17",
          0
        ],
        [
          "07:18",
          0
        ],
        [
          "07:19",
          0
        ],
        [
          "07:20",
          0
        ],
        [
          "07:21",
          0
        ],
        [
          "07:22",
          0
        ],
        [
          "07:23",
          0
        ],
        [
          "07:24",
          0
        ],
        [
          "07:25",
          0
        ],
        [
          "07:26",
          0
        ],
        [
          "07:27",
          0
        ],
        [
          "07:28",
          0
        ],
        [
          "07:29",
          0
        ],
        [
          "07:30",
          0
        ],
        [
          "07:31",
          0
        ],
        [
          "07:32",
          0
        ],
        [
          "07:33",
          0
        ],
        [
          "07:34",
          0
        ],
        [
          "07:35",
          0
        ],
        [
          "07:36",
          0
        ]
      ]
    }
  }
}

const messages: emnify.Message[] = [
  {
    "submit_date": "2019-10-05T13:56:59.000Z",
    "delivery_date": "2019-10-05T13:56:59.000Z",
    "expiry_date": "2019-10-06T13:56:59.000Z",
    "final_date": "2019-10-05T13:57:03.000Z",
    "retry_date": null,
    "last_delivery_attempt": "2019-10-05T13:57:00.000Z",
    "retry_count": 0,
    "gsm_map_error": null,
    "dcs": 0,
    "pid": 0,
    "source_address": 1234567890,
    "endpoint_id": "4564654",
    "sim_id": 625,
    "iccid": 8988303000000001000,
    "msisdn": "883XXXXXXXXXXXX",
    "imsi": "901XXXXXXXXXXXX",
    "msc": 491600190000,
    "udh": "",
    "payload": "test",
    "id": 590,
    "status": {
      "description": "DELIVERED",
      "id": 4
    },
    "sms_type": {
      "description": "MT",
      "id": 1
    },
    "source_address_type": {
      "description": "National",
      "id": 161
    }
  },
  {
    "submit_date": "2019-09-29T07:33:15.000Z",
    "delivery_date": "2019-09-29T07:33:15.000Z",
    "expiry_date": "2019-09-30T07:33:15.000Z",
    "final_date": "2019-09-29T07:33:18.000Z",
    "retry_date": null,
    "last_delivery_attempt": "2019-09-29T07:33:15.000Z",
    "retry_count": 0,
    "gsm_map_error": null,
    "dcs": 0,
    "pid": 0,
    "source_address": 1234,
    "endpoint_id": "4564654",
    "sim_id": 625,
    "iccid": 8988303000000001000,
    "msisdn": "883XXXXXXXXXXXX",
    "imsi": "901XXXXXXXXXXXX",
    "msc": 491770940000,
    "udh": "",
    "payload": "test",
    "id": 589,
    "status": {
      "description": "DELIVERED",
      "id": 4
    },
    "sms_type": {
      "description": "MT",
      "id": 1
    },
    "source_address_type": {
      "description": "National",
      "id": 161
    }
  },
  {
    "submit_date": "2019-09-21T06:22:03.000Z",
    "delivery_date": "2019-09-21T06:22:03.000Z",
    "expiry_date": "2019-09-22T06:22:03.000Z",
    "final_date": "2019-09-21T06:22:07.000Z",
    "retry_date": null,
    "last_delivery_attempt": "2019-09-21T06:22:04.000Z",
    "retry_count": 0,
    "gsm_map_error": null,
    "dcs": 0,
    "pid": 0,
    "source_address": 1234,
    "endpoint_id": "4564654",
    "sim_id": 625,
    "iccid": 8988303000000001000,
    "msisdn": "883XXXXXXXXXXXX",
    "imsi": "901XXXXXXXXXXXX",
    "msc": 491770940000,
    "udh": "",
    "payload": "test",
    "id": 577,
    "status": {
      "description": "DELIVERED",
      "id": 4
    },
    "sms_type": {
      "description": "MT",
      "id": 1
    },
    "source_address_type": {
      "description": "National",
      "id": 161
    }
  },
  {
    "submit_date": "2019-09-21T06:22:03.000Z",
    "delivery_date": "2019-09-21T06:22:03.000Z",
    "expiry_date": "2019-09-22T06:22:03.000Z",
    "final_date": "2019-09-21T06:22:07.000Z",
    "retry_date": null,
    "last_delivery_attempt": "2019-09-21T06:22:04.000Z",
    "retry_count": 0,
    "gsm_map_error": null,
    "dcs": 0,
    "pid": 0,
    "source_address": 1234,
    "endpoint_id": "4564654",
    "sim_id": 625,
    "iccid": 8988303000000001000,
    "msisdn": "883XXXXXXXXXXXX",
    "imsi": "901XXXXXXXXXXXX",
    "msc": 491770940000,
    "udh": "",
    "payload": "test",
    "id": 577,
    "status": {
      "description": "DELIVERED",
      "id": 4
    },
    "sms_type": {
      "description": "MT",
      "id": 1
    },
    "source_address_type": {
      "description": "National",
      "id": 161
    }
  },
  {
    "submit_date": "2019-09-21T06:22:03.000Z",
    "delivery_date": "2019-09-21T06:22:03.000Z",
    "expiry_date": "2019-09-22T06:22:03.000Z",
    "final_date": "2019-09-21T06:22:07.000Z",
    "retry_date": null,
    "last_delivery_attempt": "2019-09-21T06:22:04.000Z",
    "retry_count": 0,
    "gsm_map_error": null,
    "dcs": 0,
    "pid": 0,
    "source_address": 1234,
    "endpoint_id": "4564654",
    "sim_id": 625,
    "iccid": 8988303000000001000,
    "msisdn": "883XXXXXXXXXXXX",
    "imsi": "901XXXXXXXXXXXX",
    "msc": 491770940000,
    "udh": "",
    "payload": "test",
    "id": 577,
    "status": {
      "description": "DELIVERED",
      "id": 4
    },
    "sms_type": {
      "description": "MT",
      "id": 1
    },
    "source_address_type": {
      "description": "National",
      "id": 161
    }
  }
]
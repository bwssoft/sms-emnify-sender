import { auth } from "@/auth";
import axios, { AxiosError } from "axios";

/** 
 * Função para a autenticação via token na api da emnifiy.

  * @param {string} token - token de acesso a api.
  * @returns {token: string} - token de acesso a api verificado.
  * @description É uma request POST com o body: 
    {
      "application_token": "token"
    }
*/
type AuthenticateInput = {
  token: string
}
type AuthenticateOutput = {
  token?: string
  authenticated: boolean
}
export async function authenticate({ token }: AuthenticateInput): Promise<AuthenticateOutput | void> {
  return axios
    .post(`${process.env.NEXT_PUBLIC_EMNIFY_BASE_URL}/authenticate`, {
      application_token: token,
    })
    .then((response) => {
      if (response.status === 200) {
        return {
          token: response.data.auth_token,
          authenticated: true
        }
      }
      return {
        authenticated: false
      }
    })
    .catch((error) => {
      if (error instanceof AxiosError) return
      throw new Error((error as Error).name)
    });
}


/** 
 * Função para listar endpoints
*/
type ListEndpointsOutput = Endpoint[]
export async function listEndpoints(): Promise<ListEndpointsOutput> {
  const session = await auth()
  return axios
    .get(`${process.env.NEXT_PUBLIC_EMNIFY_BASE_URL}/endpoint`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${session?.user.emnify_token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      }
      return []
    })
    .catch((error) => {
      if (error instanceof AxiosError) return
      throw new Error((error as Error).name)
    });
}


/** 
 * Função para listar endpoints pelo nome do dispositivo cadastrado
*/
type ListEndpointsByNameInput = {
  name: string
}
type ListEndpointsByNameOutput = Endpoint[]

export async function listEndpointsFilteredByName({ name }: ListEndpointsByNameInput): Promise<ListEndpointsByNameOutput> {
  const session = await auth()
  return axios
    .get(`${process.env.NEXT_PUBLIC_EMNIFY_BASE_URL}/endpoint?q=name%3A${name}`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${session?.user.emnify_token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      }
      return []
    })
    .catch((error) => {
      if (error instanceof AxiosError) return
      throw new Error((error as Error).name)
    });
}


/** 
 * Função para listar endpoints pelo id do dispositivo cadastrado
*/
type ListEndpointsByIdInput = {
  id: string
}
type ListEndpointsByIdOutput = Endpoint

export async function listEndpointById({ id }: ListEndpointsByIdInput): Promise<ListEndpointsByIdOutput> {
  const session = await auth()
  return axios
    .get(`${process.env.NEXT_PUBLIC_EMNIFY_BASE_URL}/endpoint?q=id%3A${id}`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${session?.user.emnify_token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data?.[0]
      }
      return undefined
    })
    .catch((error) => {
      if (error instanceof AxiosError) return
      throw new Error((error as Error).name)
    });
}



/** 
 * Função para listar endpoints pelo id do dispositivo cadastrado
*/
type ListEndpointConnectivityByIdInput = {
  id: string
}
type ListEndpointConnectivityByIdOutput = Connectivity

export async function listEndpointConnectivityById({ id }: ListEndpointConnectivityByIdInput): Promise<ListEndpointConnectivityByIdOutput> {
  const session = await auth()
  return axios
    .get(`${process.env.NEXT_PUBLIC_EMNIFY_BASE_URL}/endpoint/${id}/connectivity`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${session?.user.emnify_token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data?.[0]
      }
      return undefined
    })
    .catch((error) => {
      if (error instanceof AxiosError) return
      throw new Error((error as Error).name)
    });
}



/** 
 * Função para listar endpoints pelo id do dispositivo cadastrado
*/
type ListEndpointUsageByIdInput = {
  id: string
}
type ListEndpointUsageByIdOutput = Usage

export async function listEndpointUsageById({ id }: ListEndpointUsageByIdInput): Promise<ListEndpointUsageByIdOutput> {
  const session = await auth()
  return axios
    .get(`${process.env.NEXT_PUBLIC_EMNIFY_BASE_URL}/endpoint/${id}/stats`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${session?.user.emnify_token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data?.[0]
      }
      return undefined
    })
    .catch((error) => {
      throw new Error((error as Error).name)
    });
}

/** 
 * Função para listar mensagens de um endpoint pelo id do dispositivo cadastrado
*/
type ListEndpointMessagesByIdInput = {
  id: string
}
type ListEndpointMessagesIdOutput = Message[]
export async function listEndpointMessagesById({ id }: ListEndpointMessagesByIdInput): Promise<ListEndpointMessagesIdOutput> {
  const session = await auth()
  return axios
    .get(`${process.env.NEXT_PUBLIC_EMNIFY_BASE_URL}/endpoint/${id}/sms`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${session?.user.emnify_token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      }
      return undefined
    })
    .catch((error) => {
      if (error instanceof AxiosError) return
      throw new Error((error as Error).name)
    });
}

/** 
 * Função para enviar uma mensagem do tipo MT para um dispositivo
*/
type SendEndpointMessageInput = {
  device_id: string
  payload: string
  source_address?: string
}
type SendEndpointMessageOutput = {
  status: string
  sms_id: string
}

export async function sendEndpointMessage({
  device_id,
  payload,
  source_address
}: SendEndpointMessageInput): Promise<SendEndpointMessageOutput | void> {
  const session = await auth()
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_EMNIFY_BASE_URL}/endpoint/${device_id}/sms`,
      { source_address: source_address ?? "12345", payload: payload },
      {
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${session?.user.emnify_token}`,
        },
      }
    )
    .then((response) => {
      if (response.status === 201) {
        return {
          status: "DELIVERY ATTEMPT PENDING",
          sms_id: response.headers.location.split("/")[8]
        }
      }
      return undefined
    })
    .catch((error) => {
      console.log('error', error)
      if (error instanceof AxiosError) return
      throw new Error((error as Error).name)
    });
}

/** 
 * Função para enviar uma mensagem do tipo MT para um dispositivo
*/
type GetEndpointMessageInput = {
  device_id: string
  sms_id: string
}
type GetEndpointMessageOutput = Message

export async function getEndpointMessage({
  device_id,
  sms_id,
}: GetEndpointMessageInput): Promise<GetEndpointMessageOutput | undefined> {
  const session = await auth()
  return axios
    .get(`${process.env.NEXT_PUBLIC_EMNIFY_BASE_URL}/endpoint/${device_id}/sms/${sms_id}`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${session?.user.emnify_token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      }
      return undefined
    })
    .catch((error) => {
      if (error instanceof AxiosError) return
      throw new Error((error as Error).name)
    });
}



export type Endpoint = {
  id: number,
  name: string,
  status: {
    id: 0 | 1,
    description: "Enabled" | "Disabled" // "Disabled"
  },
  service_profile: {
    id: number,
    name: string // "Smart Meter"
  },
  tariff_profile: {
    id: number,
    name: string // "Domestic only"
  },
  sim?: SIM,
  imei?: string //"864345678889321",
  imei_lock?: boolean
  ip_address?: string //"10.203.23.75",
  ip_address_space?: {
    id: number
  },
  tags?: string //"arduino, meter, temp",
  created: string //"1970-01-01T00:00:00.000+0000",
  last_updated: string //"1970-01-01T00:00:00.000+0000",
}
export type Connectivity = {
  status: {
    description: "ONLINE" | "OFFLINE" | "ATTACHED" | "BLOCKED"
  },
  location: {
    iccid: number // 8988303010000000000,
    imsi: number // 901439999999999,
    last_updated: string // "2019-12-03T07:06:04.000Z",
    last_updated_gprs: string // "2019-12-30T14:55:35.000Z",
    sgsn_number: number //491770695700,
    vlr_number: number //491770940000,
    msc: number //491770940000,
    operator: {
      id: number //4,
      name: string // "EPlus",
      country: {
        id: number //74,
        name: string // "Germany"
      }
    },
    country: {
      country_id: number //74,
      name: string // "Germany",
      country_code: number //49,
      mcc: number //262,
      iso_code: string // "de"
    },
    sgsn_ip_address: string // "212.23.107.88"
  },
  pdp_context: {
    pdp_context_id: number //92415,
    endpoint_id: number //166,
    tariff_profile_id: number //35,
    tariff_id: number //54,
    ratezone_id: number //70,
    organisation_id: number //2,
    imsi_id: number //627,
    imsi: number //901439999999999,
    sim_id: number //625,
    teid_data_plane: number //7116,
    teid_control_plane: number //7116,
    gtp_version: number //1,
    nsapi: number //5,
    sgsn_control_plane_ip_address: string //"212.23.107.89",
    sgsn_data_plane_ip_address: string //"212.23.107.89",
    ggsn_control_plane_ip_address: string //"185.57.216.35",
    ggsn_data_plane_ip_address: string //"185.57.216.35",
    created: string //"2019-12-04T08:12:02.000Z",
    mcc: number //262,
    mnc: number //3,
    operator_id: number //4,
    lac: number //40217,
    ci: null,
    sac: number //42937,
    rac: null,
    ue_ip_address: string // "10.199.5.223",
    imeisv: number //3526510721968301,
    rat_type: {
      rat_type_id: number //1,
      description: string // "3G"
    },
    duration: string // "00:00:04"
  },
  services: ("GPRS")[]
}
export type Usage = {
  last_month: {
    data: MonthData,
    sms: MonthSMS
  },
  current_month: {
    data: MonthData,
    sms: MonthSMS
  },
  last_hour: {
    data: {
      rx: [string, number][]
      tx: [string, number][]
    },
    sms: {
      rx: [string, number][]
      tx: [string, number][]
    }
  }
}

export type Message = {
  "submit_date": string //"2019-10-05T13:56:59.000Z",
  "delivery_date": string //"2019-10-05T13:56:59.000Z",
  "expiry_date": string // "2019-10-06T13:56:59.000Z",
  "final_date": string //"2019-10-05T13:57:03.000Z",
  "retry_date": null,
  "last_delivery_attempt": string // "2019-10-05T13:57:00.000Z",
  "retry_count": number //0,
  "gsm_map_error": null,
  "dcs": number //0,
  "pid": number //0,
  "source_address": number //1234567890,
  "endpoint": {
    "id": number // 166,
    "name": string // "Your Endpoint"
  },
  "sim_id": number // 625,
  "iccid": number //8988303000000001000,
  "msisdn": string //"883XXXXXXXXXXXX",
  "imsi": string //"901XXXXXXXXXXXX",
  "msc": number //491600190000,
  "udh": string //"",
  "payload": string //"test",
  "id": number //590,
  "status": {
    "description": "DELIVERY" |
    "ATTEMPT PENDING" |
    "IN PROGRESS" |
    "BUFFERED" |
    "DELIVERED" |
    "FAILED" |
    "EXPIRED" |
    "CANCELED"
    "id": number //4
  },
  "sms_type": {
    "description": "MT" | "MO" //"MT",
    "id": number //1
  },
  "source_address_type": {
    "description": string // "National",
    "id": number // 161
  }
}


type SIM = {
  id: number // 788,
  iccid: string // "7368267364738977362",
  iccid_with_luhn: string // "73682673647389773621",
  imsi: string // "901991234567890",
  msisdn: string // "88563748761",
  status: {
    id: number,
    description: string // "Suspended"
  }
  eid?: string,
}

type MonthData = {
  endpoint_id: number //166,
  month: string //"2019-11-01T00:00:00.000Z",
  volume: string //"29.166235",
  volume_tx: string //"5.577229",
  volume_rx: string //"23.589006",
  traffic_type_id: number //5,
  last_updated: string //"2019-11-30T14:56:25.000Z",
  cost: string //6.10483935,
  currency_id: number //1,
  id: number //311,
  traffic_type: {
    description: string //"Data",
    unit: string //"MB",
    id: number //5
  },
  currency: {
    code: string //"EUR",
    symbol: string //"€",
    id: number //1
  }
}

type MonthSMS = {
  endpoint_id: number //166,
  month: string //"2019-11-01T00:00:00.000Z",
  volume: string //"51.000000",
  volume_tx: string //"36.000000",
  volume_rx: string //"15.000000",
  traffic_type_id: number //6,
  last_updated: string //"2019-11-26T10:52:42.000Z",
  cost: string //"3.3200000000",
  currency_id: number //1,
  id: number //312,
  traffic_type: {
    description: string //"SMS",
    unit: string //"SMS",
    id: 6
  },
  currency: {
    code: string // "EUR",
    symbol: string //"€",
    id: number //1
  }
}
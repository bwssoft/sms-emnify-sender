import axios from "axios";

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
export async function authenticate({ token }: AuthenticateInput): Promise<AuthenticateOutput> {
  return axios
    .post(`${process.env.EMNIFY_BASE_URL}/authenticate`, {
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
      throw new Error((error as Error).name)
    });
}


/** 
 * Função para listar endpoints
*/
type ListEndpointsOutput = Endpoint[]
export async function listEndpoints(): Promise<ListEndpointsOutput> {
  return axios
    .get(`${process.env.EMNIFY_BASE_URL}/endpoint`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${process.env.EMNIFY_AUTH_TOKEN}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      }
      return []
    })
    .catch((error) => {
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

export async function listEndpointsByName({ name }: ListEndpointsByNameInput): Promise<ListEndpointsByNameOutput> {
  return axios
    .get(`${process.env.EMNIFY_BASE_URL}/endpoint?q=name%3A${name}`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${process.env.EMNIFY_AUTH_TOKEN}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      }
      return []
    })
    .catch((error) => {
      throw new Error((error as Error).name)
    });
}


type Endpoint = {
  id: number,
  name: string,
  tags: string //"arduino, meter, temp",
  created: string //"1970-01-01T00:00:00.000+0000",
  last_updated: string //"1970-01-01T00:00:00.000+0000",
  status: {
    id: number,
    description: string // "Disabled"
  },
  service_profile: {
    id: number,
    name: string // "Smart Meter"
  },
  tariff_profile: {
    id: number,
    name: string // "Domestic only"
  },
  sim: {
    id: number // 788,
    iccid: string // "7368267364738977362",
    iccid_with_luhn: string // "73682673647389773621",
    imsi: string // "901991234567890",
    msisdn: string // "88563748761",
    status: {
      i: number,
      descriptio: string // "Suspended"
    }
  },
  imei: string //"864345678889321",
  ip_address: string //"10.203.23.75",
  ip_address_space: {
    id: number
  },
  imei_lock: boolean
}
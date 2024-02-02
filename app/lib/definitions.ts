export type Client = {
	username: string;
	name: string;
	uuid: string;
	password: string;
};

export type Simcard = {
	saitro: any;
	emnify: {
		endpoint_id: string;
		endpoint_imei: string;
		endpoint_name: string;
		sim_id: string;
		sim_msisdn: string;
	} & any;
	client_uuid: string;
	uuid: string;
};

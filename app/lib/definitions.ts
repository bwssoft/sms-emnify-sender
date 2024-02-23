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
	} & any;
	client_uuid: string;
	uuid: string;
	sim_msisdn: string;
};

export type Command = {
	_id?: string;
	name: string;
	variables?: Array<{ name: string; description?: string }>;
	description?: string;
	command: string;
	uuid: string;
	readonly?: boolean;
};

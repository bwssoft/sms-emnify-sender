import { Path } from 'react-hook-form'; 
import { IManageQueryResponse } from '../utils/helperObject';

export const excludeClientConstants: Array<Path<any>> = [];

export const refineQueryState = (
	data: Omit<IManageQueryResponse<any>, 'refine'>,
): Omit<IManageQueryResponse<object>, 'refine'> => {
	const currentKeys = Object.keys(data);
	currentKeys.forEach((key) => {
		if (excludeClientConstants.includes(key as Path<any>)) {
			delete data[key as keyof object];
		}

		if (key.includes('created_at')) {
			delete data[key as keyof object];
			data['created_at'] = true;
		}
	});

	return data;
};

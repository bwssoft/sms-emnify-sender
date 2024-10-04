import _ from 'lodash';
import { Path } from './path';
import { Condition, Filter } from 'mongodb';

export const cleanObject = <T>(obj: T): Partial<T> => {
	if (_.isArray(obj)) {
		return obj
			.map((item) => cleanObject(item))
			.filter(
				(item) =>
					(!_.isEmpty(item) || _.isNumber(item)) &&
					item !== null &&
					item !== undefined,
			) as T;
	} else if (_.isObject(obj)) {
		return _(obj)
			.mapValues((value) => cleanObject(value))
			.pickBy(
				(value) =>
					(!_.isEmpty(value) || _.isBoolean(value)) &&
					value !== null &&
					value !== undefined,
			)
			.value() as T;
	} else {
		return obj;
	}
};

export type MethodRefineQuery<T> = {
	refine: (
		fn: (
			data: Omit<IManageQueryResponse<T>, 'refine'>,
		) => Omit<IManageQueryResponse<T>, 'refine'>,
	) => Omit<IManageQueryResponse<T>, 'refine'>;
};

export type IManageQueryResponse<T> = {
	[key in Path<T>]: T[keyof T];
};

export const manageQuery = <T extends object>(
	data: T,
): Partial<IManageQueryResponse<T>> => {
	const mapKeys = Object.keys(data);
	let objectValues: Partial<IManageQueryResponse<T>> =
		{} as Partial<IManageQueryResponse<T>>
	mapKeys.forEach((key) => {
		const value = data[key as keyof T];
		if (_.isArray(value)) {
			objectValues = { ...objectValues, [key]: value };
			return;
		}
		if (_.isObject(value)) {
			const values = manageQuery(value);
			const keys = Object.keys(values);
			keys.forEach((subKey) => {
				if (subKey === 'refine') return;
				objectValues = {
					...objectValues,
					[`${key}.${subKey}`]: values[subKey as keyof typeof values],
				};
			});
			return;
		}

		objectValues = { ...objectValues, [key]: value };
	});

	objectValues = {
		...objectValues,
	};

	return objectValues;
};


export type IManageFunctionsQuery<Schema, T> = {
	[key in Path<Schema>]?: (
		value: Schema[keyof Schema],
	) => Filter<T>
};

export const queryHandler = <Entity, SchemaForm>(
	data: Partial<IManageQueryResponse<Partial<SchemaForm>>>,
	objectFunctions: IManageFunctionsQuery<SchemaForm, Entity>,
) => {
	let queryState: Filter<Entity> = {};
	const mapsKeys = Object.keys(data);
	mapsKeys.forEach((key) => {
		const value = data[key as keyof typeof data];
		const propertyQueryFn =
			objectFunctions[key as keyof typeof objectFunctions];
		if (propertyQueryFn) {
			const query = propertyQueryFn(value as SchemaForm[keyof SchemaForm]);
			const partialQuery = _.merge(queryState, query);
			queryState = partialQuery;
		}
	});

	return queryState;
};
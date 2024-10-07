import { refineQueryState } from "../constants/exclude.client.constants";
import { IHookActiveFilterManagerProps } from "../types/useActiveFilterManager.hook.type";
import { cleanObject, manageQuery } from "../utils/helperObject"; 


export const useActiveFilterManager = ({ queryState = {}, excludePropsCount = [] }: IHookActiveFilterManagerProps) => {
	const formaterQuery = cleanObject(queryState);
	const filters = manageQuery(formaterQuery).refine(refineQueryState);

	const filtersKeys = Object.keys(filters || {}).filter((key) => !excludePropsCount.includes(key));
	return filtersKeys.length;
};

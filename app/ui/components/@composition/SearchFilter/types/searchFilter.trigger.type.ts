import { ExcludePropsType } from "./exclude-props.type";

export type ISearchFilterTriggerType <T> = {
	onClick?: () => Promise<void> | void;
	filterEnabled?: false;
	onReset?: () => Promise<void> | void;
} | ISearchFilterTriggerTypeWithCount<T>;

export type ISearchFilterTriggerTypeWithCount <T> = {
	onClick?: () => Promise<void> | void;
	onReset?: () => Promise<void> | void;
	filterEnabled?: true;
	queryState: T;
	excludePropsCount?: ExcludePropsType<T>;
}

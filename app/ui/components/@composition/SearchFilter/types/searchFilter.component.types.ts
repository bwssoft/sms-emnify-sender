import { IChildrenType } from "./base.types";
import { ISearchFilterTriggerType } from "./searchFilter.trigger.type";

export type ISearchFilterComponentType<T> = IChildrenType & ISearchFilterTriggerType<T>;
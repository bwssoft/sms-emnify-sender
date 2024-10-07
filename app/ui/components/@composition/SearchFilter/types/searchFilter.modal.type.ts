import { ModalProps } from "@bwsoft/modal";

export type ISearchFilterActionsType = {
	onCancel?: () => Promise<void> | void;
	onConfirm?: () => Promise<void> | void;
	onReset?: () => Promise<void> | void;
	peddingRequest?: boolean;
};

export type ISearchFilterModalType = Pick<ModalProps, 'children' | 'className' | 'onClose' | 'open'> & ISearchFilterActionsType;

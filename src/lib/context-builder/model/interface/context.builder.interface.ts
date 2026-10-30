import { IContextBuilderController } from "./context.builder.controller.interface";

export interface IContextBuilder {
    registerController(controller: IContextBuilderController): number;
    unregisterController(controllerId: number): void;
    destroy(): void;
    contextLoading(loading: boolean): void;
}

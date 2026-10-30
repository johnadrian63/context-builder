import { IContextBuilderController } from "./context.builder.controller.interface";

export interface IContextBuilderBaseController extends IContextBuilderController {
    contextLoading?(loading: boolean): void;
}

import {
    IContextBuilder,
    IContextBuilderController,
} from "./model/interface";

export type ControllerId = number;

export abstract class ContextBuilder<T1 extends IContextBuilderController> implements IContextBuilder {

    public get controllers(): T1[] {
        return Array.from(this.controllerMapper.values());
    }

    private controllerId: ControllerId = 0;
    private controllerMapper: Map<ControllerId, T1> = new Map<ControllerId, T1>();

    public registerController(controller: T1): number {
        this.controllerId += 1;

        this.controllerMapper.set(this.controllerId, controller);

        console.log(`context: total registered controllers (${this.controllerMapper.size}), controllerId="${this.controllerId}"`);
        return this.controllerId;
    }

    public unregisterController(controllerId: number): void {
        console.warn("context: total controllers", this.controllerMapper.size);

        if (this.controllerMapper.has(controllerId) === false) {
            throw new Error(
                `can't delete the controller since it's not existing.`
            );
        }

        this.controllerMapper.delete(controllerId);
        console.warn("context: destroying context controller", controllerId);
    }

    public contextLoading(loading: boolean): void {
        for (const controller of this.controllers) {
            if (typeof controller.contextLoading === "function") {
                controller.contextLoading(loading);
            }
        }
    }

    public destroy(): void {
        for (const controller of this.controllers) {
            if (typeof controller.destroy === "function") {
                controller.destroy();
            }
        }
    }
}

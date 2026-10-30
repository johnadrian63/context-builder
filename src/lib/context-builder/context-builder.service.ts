import { Injectable } from "@angular/core";

import { ContextBuilder } from "./context-builder";
import { IContextBuilderController } from "./model/interface";
import { ContextBuilderDataLoader } from "./model/context-builder.data-loader";

interface IContextBuilderService {
    registerController(controller: IContextBuilderController): number;
    unregisterController(controllerId: number): void;
    destroy(): void;
}

@Injectable()
export abstract class ContextBuilderService<T> implements IContextBuilderService {

    public get data(): T {
        return this._data;
    }

    private _data!: T;
    private initialized!: boolean;
    private lastContextTimer!: ReturnType<typeof setTimeout>;

    protected abstract context: ContextBuilder<IContextBuilderController>;
    protected abstract loader: ContextBuilderDataLoader<T>;

    public async load(): Promise<T> {
        this.initialized = false;

        this.context.contextLoading(true);

        try {
            this._data = await this.loader.load();
        } catch (error) {
            console.warn(error);
        }

        this.initialized = true;

        this.context.contextLoading(false);

        return this.data;
    }

    public registerController(controller: IContextBuilderController): number {
        const controllerId = this.context.registerController(controller);

        this.loadedContext();

        return controllerId;
    }

    public unregisterController(controllerId: number): void {
        this.context.unregisterController(controllerId);
    }

    public destroy(): void {
        this.context.destroy();
    }

    private loadedContext(): void {
        if (this.initialized === true) {

            if (this.lastContextTimer) {
                clearTimeout(this.lastContextTimer);
            }

            this.lastContextTimer = setTimeout(() => {
                this.context.contextLoading(false);
            });
        }
    }
}

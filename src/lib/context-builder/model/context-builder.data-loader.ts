export abstract class ContextBuilderDataLoader<T> {
    public abstract load(): Promise<T>;
}

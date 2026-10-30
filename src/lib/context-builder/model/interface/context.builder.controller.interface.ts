export interface IContextBuilderController {
    contextLoading?(loading: boolean): void;
    destroy?(): void;
}

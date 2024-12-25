export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors: Record<string, unknown>;
    meta: unknown;
}

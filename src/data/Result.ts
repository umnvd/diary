type OnSuccess<T> = (data: T) => void;
type OnError = (error: string) => void;

export default class Result<T> {
    handle(
        onSuccess: OnSuccess<T>,
        onError?: OnError
    ) {
        if (this instanceof SuccessResult) {
            onSuccess(this.data);
        }
        if (this instanceof ErrorResult && onError) {
            onError(this.error);
        }
    }
}

export class SuccessResult<T> extends Result<T> {
    constructor(public readonly data: T) { super(); }
}

export class ErrorResult<T> extends Result<T> {
    constructor(public readonly error: string) { super(); }
}
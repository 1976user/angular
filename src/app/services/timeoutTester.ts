export function returnAfterTimeout<TValue>(value: TValue, timeout: number)
    : (resolve: (result: TValue) => void) => void {
    return resolve => setTimeout(() => resolve(value), timeout);
}
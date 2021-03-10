declare module 'tiny-encryption-algorithm' {
    export function encrypt(content: string, password: string): string;
    export function decrypt(content: string, password: string): string;
}

type Stack = 'backend' | 'frontend';
type Level = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type BackendPackage = 'cache' | 'controller' | 'cron_job' | 'domain' | 'handler' | 'repository' | 'route' | 'service' | 'utils';
type FrontendPackage = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'utils';
type Package = BackendPackage | FrontendPackage;
export declare const log: (stack: Stack, level: Level, packageName: Package, message: string) => void;
export declare const logger: {
    debug: (stack: Stack, packageName: Package, message: string) => void;
    info: (stack: Stack, packageName: Package, message: string) => void;
    warn: (stack: Stack, packageName: Package, message: string) => void;
    error: (stack: Stack, packageName: Package, message: string) => void;
    fatal: (stack: Stack, packageName: Package, message: string) => void;
};
export {};

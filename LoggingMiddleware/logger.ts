// Simple logging middleware
type Stack = 'backend' | 'frontend';
type Level = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type BackendPackage = 'cache' | 'controller' | 'cron_job' | 'domain' | 'handler' | 'repository' | 'route' | 'service' | 'utils';
type FrontendPackage = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'utils';
type Package = BackendPackage | FrontendPackage;

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFybWFzbmVoYTAzMTlAZ21haWwuY29tIiwiZXhwIjoxNzUyNDc3NzAwLCJpYXQiOjE3NTI0NzY4MDAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2Y2JhZjJkOS00ZDk4LTRiMzUtOTQ4Yy1jYmRjYWExZWU2NTQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzbmVoYSBzaGFybWEiLCJzdWIiOiI3YTM5OWU0ZS1iZmU5LTQ0NmYtOGI4My1hNTkxNjQ2MTViM2EifSwiZW1haWwiOiJzaGFybWFzbmVoYTAzMTlAZ21haWwuY29tIiwibmFtZSI6InNuZWhhIHNoYXJtYSIsInJvbGxObyI6IjEyMjE0ODg0IiwiYWNjZXNzQ29kZSI6IkNaeXBRSyIsImNsaWVudElEIjoiN2EzOTllNGUtYmZlOS00NDZmLThiODMtYTU5MTY0NjE1YjNhIiwiY2xpZW50U2VjcmV0IjoiTndlaHNhTVdzS0NIalhXbiJ9.XRRX7TYXvmUl2d9gMoWABoElsh8isWhy6a-jqciGHm8';

export const log = (stack: Stack, level: Level, packageName: Package, message: string): void => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${stack}] [${level}] [${packageName}] ${message}`);
  
  const logData = {
    stack,
    level,
    package: packageName,
    message
  };

  if (typeof window !== 'undefined' && window.fetch) {
    window.fetch(LOG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(logData)
    }).catch(() => {
    });
  }
};

export const logger = {
  debug: (stack: Stack, packageName: Package, message: string) => log(stack, 'debug', packageName, message),
  info: (stack: Stack, packageName: Package, message: string) => log(stack, 'info', packageName, message),
  warn: (stack: Stack, packageName: Package, message: string) => log(stack, 'warn', packageName, message),
  error: (stack: Stack, packageName: Package, message: string) => log(stack, 'error', packageName, message),
  fatal: (stack: Stack, packageName: Package, message: string) => log(stack, 'fatal', packageName, message),
};

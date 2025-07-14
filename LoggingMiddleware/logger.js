"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.log = void 0;
const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFybWFzbmVoYTAzMTlAZ21haWwuY29tIiwiZXhwIjoxNzUyNDc3NzAwLCJpYXQiOjE3NTI0NzY4MDAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2Y2JhZjJkOS00ZDk4LTRiMzUtOTQ4Yy1jYmRjYWExZWU2NTQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzbmVoYSBzaGFybWEiLCJzdWIiOiI3YTM5OWU0ZS1iZmU5LTQ0NmYtOGI4My1hNTkxNjQ2MTViM2EifSwiZW1haWwiOiJzaGFybWFzbmVoYTAzMTlAZ21haWwuY29tIiwibmFtZSI6InNuZWhhIHNoYXJtYSIsInJvbGxObyI6IjEyMjE0ODg0IiwiYWNjZXNzQ29kZSI6IkNaeXBRSyIsImNsaWVudElEIjoiN2EzOTllNGUtYmZlOS00NDZmLThiODMtYTU5MTY0NjE1YjNhIiwiY2xpZW50U2VjcmV0IjoiTndlaHNhTVdzS0NIalhXbiJ9.XRRX7TYXvmUl2d9gMoWABoElsh8isWhy6a-jqciGHm8';
const log = (stack, level, packageName, message) => {
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
exports.log = log;
exports.logger = {
    debug: (stack, packageName, message) => (0, exports.log)(stack, 'debug', packageName, message),
    info: (stack, packageName, message) => (0, exports.log)(stack, 'info', packageName, message),
    warn: (stack, packageName, message) => (0, exports.log)(stack, 'warn', packageName, message),
    error: (stack, packageName, message) => (0, exports.log)(stack, 'error', packageName, message),
    fatal: (stack, packageName, message) => (0, exports.log)(stack, 'fatal', packageName, message),
};
//# sourceMappingURL=logger.js.map
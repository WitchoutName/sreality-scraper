import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { config as dotConfig } from 'dotenv';


export const rootDir = path.resolve(dirname(fileURLToPath(import.meta.url)), '../../');

export function envSetup(){
    dotConfig({ path: path.join(rootDir, '.env') });
    Object.keys(process.env).forEach((key) => {
        const value = process.env[key];
        config[key] = convertToNumber(value);
    });
}

function convertToNumber(value: string): number | string {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? value : parsedValue;
}

const config: Record<string, number | string> = {};


export default config;

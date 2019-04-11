import { EnvConfig } from './env-config.interface';
import { isDevMode } from '@angular/core';
import { ProdConfig } from './environment.prod';
import { DevConfig } from './environment';

export const Config: EnvConfig = isDevMode() ? DevConfig : ProdConfig;


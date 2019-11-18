import { REQUEST } from '@nestjs/core';
import { Injectable, Inject, Scope } from '@nestjs/common';

import config from 'config';
import PlatformFactory from '../../../../platform/factory';

@Injectable({ scope: Scope.REQUEST })
export class PlatformProvider {
  constructor (@Inject(REQUEST) private readonly request) { }

  public getAdapter (adapterName: string) {
    return (new PlatformFactory(config, this.request)).getAdapter(config.get('platform'), adapterName);
  }
}

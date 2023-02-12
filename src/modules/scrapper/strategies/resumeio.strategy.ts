import { BaseStrategy } from './base.strategy';
import { Logger } from '@nestjs/common';
import { RegexUtil } from '@/modules/util/regex.util';
import { PuppeteerProvider } from '../providers/puppeteer.provider';

export class ResumeioStrategy implements BaseStrategy {
  urlRegex = RegexUtil.url;
  private readonly logger = new Logger(ResumeioStrategy.name);

  constructor(private readonly url: string, private readonly timeout: number) {}

  async build(): Promise<Buffer[]> {
    try {
      const provider = new PuppeteerProvider(
        this.url,
        this.timeout,
        this.urlRegex,
      );

      return await provider.scrape();
    } catch (e) {
      this.logger.error(e);
    }
  }
}

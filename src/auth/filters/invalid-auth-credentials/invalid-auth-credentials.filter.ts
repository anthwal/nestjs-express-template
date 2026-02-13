import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { VIEW_RENDER_ENGINE } from '../../../view-engine/constants';
import Twig, { RenderOptions } from 'twig';
import { ConfigService } from '@nestjs/config';
import { join } from 'node:path';
import { ViewConfig } from '../../../environment/environment-types.interface';

@Catch(UnprocessableEntityException)
export class InvalidAuthCredentialsFilter implements ExceptionFilter {
  constructor(
    @Inject(VIEW_RENDER_ENGINE) private readonly twig: typeof Twig,
    protected configService: ConfigService,
  ) {}
  async catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    if (
      !!request.query.grant_type &&
      !!request.query.client_id &&
      !!request.query.algorithm &&
      !!request.query.code_challenge &&
      !!request.query.redirect_url
    ) {
      return;
    }
    response
      .status(404)
      .header('content-type', 'text/html')
      .send(await this.fileContent('not-found'));
  }

  public async fileContent(
    fileName: string,
    context: RenderOptions = {},
  ): Promise<string> {
    const viewConfig = this.configService.getOrThrow<ViewConfig>('view');
    return new Promise<string>((res, rej) => {
      this.twig.renderFile(
        join(viewConfig.viewPath, `${fileName}.twig`),
        context,
        (err, result: string) => {
          if (err) {
            rej(err);
            return;
          }
          res(result);
        },
      );
    });
  }
}

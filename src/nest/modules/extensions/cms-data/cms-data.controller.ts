import { Controller, Get, Param, Res } from '@nestjs/common';
import { CmsDataService } from './cms-data.service';

@Controller()
export class CmsDataController {
  constructor (private readonly cmsDataService: CmsDataService) { }

  @Get('/cmsPage/:id')
  public getCmsPage (@Res() response, @Param('id') id) {
    this.cmsDataService.getCmsPage(response, id);
  }

  @Get('/cmsBlock/:id')
  public getCmsBlock (@Res() response, @Param('id') id) {
    this.cmsDataService.getCmsBlock(response, id);
  }

  @Get('/cmsPageIdentifier/:identifier/storeId/:storeId')
  public cmsPageIdentifier (@Res() response, @Param('identifier') identifier, @Param('storeId') storeId
  ) {
    this.cmsDataService.cmsPageIdentifier(response, identifier, storeId);
  }

  @Get('/cmsBlockIdentifier/:identifier/storeId/:storeId')
  public cmsBlockIdentifier (@Res() response, @Param('identifier') identifier, @Param('storeId') storeId
  ) {
    this.cmsDataService.cmsBlockIdentifier(response, identifier, storeId);
  }
}

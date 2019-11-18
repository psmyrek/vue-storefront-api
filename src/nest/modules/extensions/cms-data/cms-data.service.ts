import config from 'config';
import { Injectable } from '@nestjs/common';
import magento2Client from 'magento2-rest-client';
import { apiStatus } from '../../../../lib/util';

@Injectable()
export class CmsDataService {
  private magentoClient;

  constructor () {
    this.magentoClient = magento2Client.Magento2Client(config.get('magento2.api'));
  }

  public getCmsPage (response, id) {
    this.magentoClient.addMethods('cmsPage', restClient => ({
      getPage () {
        return restClient.get(`/snowdog/cmsPage/${id}`);
      }
    }));

    this.magentoClient.cmsPage.getPage()
      .then(result => apiStatus(response, result, 200))
      .catch(error => apiStatus(response, error, 500));
  }

  public getCmsBlock (response, id) {
    this.magentoClient.addMethods('cmsBlock', restClient => ({
      getBlock () {
        return restClient.get(`/snowdog/cmsBlock/${id}`);
      }
    }));

    this.magentoClient.cmsBlock.getBlock()
      .then(result => apiStatus(response, result, 200))
      .catch(error => apiStatus(response, error, 500));
  }

  public cmsPageIdentifier (response, identifier, storeId) {
    this.magentoClient.addMethods('cmsPageIdentifier', restClient => ({
      getPageIdentifier () {
        return restClient.get(`/snowdog/cmsPageIdentifier/${identifier}/storeId/${storeId}`);
      }
    }));

    this.magentoClient.cmsPageIdentifier.getPageIdentifier()
      .then(result => apiStatus(response, result, 200))
      .catch(error => apiStatus(response, error, 500));
  }

  public cmsBlockIdentifier (response, identifier, storeId) {
    this.magentoClient.addMethods('cmsBlockIdentifier', restClient => ({
      getBlockIdentifier () {
        return restClient.get(`/snowdog/cmsBlockIdentifier/${identifier}/storeId/${storeId}`);
      }
    }));

    this.magentoClient.cmsBlockIdentifier.getBlockIdentifier()
      .then(result => apiStatus(response, result, 200))
      .catch(error => apiStatus(response, error, 500));
  }
}

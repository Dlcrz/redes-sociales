import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import RedesSociales from './components/RedesSociales';
import { IRedesSocialesProps } from './components/IRedesSocialesProps';

export interface IRedesSocialesWebPartProps {}

export default class RedesSocialesWebPart extends BaseClientSideWebPart<IRedesSocialesWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IRedesSocialesProps> = React.createElement(
      RedesSociales,
      {
        siteUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.context.spHttpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
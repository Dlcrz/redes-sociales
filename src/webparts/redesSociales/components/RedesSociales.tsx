import * as React from 'react';
import { IRedSocialElemento } from './IRedSocialElemento';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import styles from './RedesSociales.module.scss';

export interface IRedesSocialesProps {
  siteUrl: string;
  spHttpClient: SPHttpClient;
}

export interface IRedesSocialesState {
  items: (IRedSocialElemento & { IconoURL?: string })[];
}

export default class RedesSociales extends React.Component<IRedesSocialesProps, IRedesSocialesState> {
  constructor(props: IRedesSocialesProps) {
    super(props);
    this.state = {
      items: []
    };
  }

  public componentDidMount(): void {
    this._loadItems();
  }

  private _loadItems(): void {
    const url = `${this.props.siteUrl}/_api/web/lists/getbytitle('Redes Sociales')/items?$select=ID,Title,Link,Icono`;

    this.props.spHttpClient.get(url, SPHttpClient.configurations.v1, {
      headers: { Accept: 'application/json' }
    })
      .then((response: SPHttpClientResponse) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data: { value: IRedSocialElemento[] }) => {
        const itemsProcesados = data.value.map(item => {
          let iconoUrl = '';
          try {
            const iconoData = JSON.parse((item as any).Icono);
            iconoUrl = `${this.props.siteUrl}/Lists/Redes%20Sociales/Attachments/${item.ID}/${iconoData.fileName}`;
          } catch (e) {
            console.warn('❗ No se pudo parsear Icono:', item.Icono);
          }

          return {
            ...item,
            IconoURL: iconoUrl
          };
        });

        this.setState({ items: itemsProcesados });
      })
      .catch(error => {
        console.error('❌ Error al cargar redes sociales:', error);
      });
  }

  public render(): React.ReactElement<IRedSocialElemento> {
    return (
      <div className={styles.socialBar}>
        {this.state.items.map((item, index) => (
          <a
            key={index}
            href={item.Link?.Url ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            title={item.Title}
          >
            {item.IconoURL && (
              <img
                src={item.IconoURL}
                alt={item.Title}
                className={styles.iconImage}
              />
            )}
          </a>
        ))}
      </div>
    );
  }
}
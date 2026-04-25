import { IProps } from '../../../modules/Block';
import { join } from '../../../modules/templator';

export const template = (props: IProps) => `
  <template class="{{ classNameRoot }}">
    ${
        props.isLoading
            ? '<div class="{{ className }}__status">Ищем пользователей...</div>'
            : ''
    }
    ${
        !props.isLoading && props.users.length
            ? `
      <p class="{{ className }}__title">Пользователи</p>
      <ul class="{{ className }}__list">
        ${join(
            props.UserResultItem.map(
                (_: unknown, index: number) =>
                    `<UserResultItem key="${index}" />`,
            ),
        )}
      </ul>
    `
            : ''
    }
    ${
        !props.isLoading && props.hasQuery && !props.users.length
            ? '<div class="{{ className }}__status">Пользователи не найдены</div>'
            : ''
    }
  </template>
`;

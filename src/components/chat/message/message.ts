import { compile } from '../../../modules/templator';
import { template } from './message.tmpl';
import defaultAvatar from '../../../assets/img/noavatar.svg';
import Block from '../../../modules/Block';

import './message.css';
import formatDate from '../../../utils/formatDate';
import { IMessageListItem } from '../../../types/models';

interface IMessageProps extends IMessageListItem {
    onReply?: (messageId: number) => void;
    onEdit?: (messageId: number) => void;
    onDelete?: (messageId: number) => void;
    onForward?: (messageId: number) => void;
}

export default class Message extends Block {
    constructor(props: IMessageProps) {
        super('li', {
            className: 'message',
            classNameRoot:
                props.isOwnMessage
                    ? 'message message_outgoing-message'
                    : 'message',
            classNameDate:
                props.isOwnMessage
                    ? 'message__date message__date_outgoing-message'
                    : 'message__date',
            id: props.id,
            chat_id: props.chat_id,
            user_id: props.user_id,
            type: props.type,
            content: props.content,
            file: props.file,
            time: formatDate(props.time),
            avatar: props.avatar ?? defaultAvatar,
            formattedDate: props.time,
            canReply: props.canReply,
            canEdit: props.canEdit,
            canDelete: props.canDelete,
            canForward: props.canForward,
            isEdited: props.isEdited,
            isDeleted: props.isDeleted,
            isPending: props.isPending,
            pendingAction: props.pendingAction,
            replyPreview: props.replyPreview,
            messageBodyClass: props.isDeleted
                ? 'message__text message__text_deleted'
                : 'message__text',
            messageMetaStatus: props.isPending
                ? `${props.pendingAction || 'message'}...`
                : props.isEdited
                    ? 'edited'
                    : '',
            metaStatusClass: props.isPending || props.isEdited
                ? 'message__status'
                : 'message__status message__status_hidden',
            replyClass: props.replyPreview
                ? 'message__reply'
                : 'message__reply message__reply_hidden',
            replyActionClass: props.canReply
                ? 'message__action'
                : 'message__action message__action_hidden',
            editActionClass: props.canEdit
                ? 'message__action'
                : 'message__action message__action_hidden',
            deleteActionClass: props.canDelete
                ? 'message__action'
                : 'message__action message__action_hidden',
            forwardActionClass: props.canForward
                ? 'message__action'
                : 'message__action message__action_hidden',
            onReply: props.onReply,
            onEdit: props.onEdit,
            onDelete: props.onDelete,
            onForward: props.onForward,
            events: {
                click: (evt: MouseEvent) => this.handleClick(evt),
            },
        });
    }

    private handleClick(evt: MouseEvent) {
        const target = evt.target as HTMLElement;
        const action = target.closest<HTMLButtonElement>('[data-message-action]')
            ?.dataset.messageAction;

        if (!action) {
            return;
        }

        if (action === 'reply' && this.props.onReply) {
            this.props.onReply(this.props.id);
        }

        if (action === 'edit' && this.props.onEdit) {
            this.props.onEdit(this.props.id);
        }

        if (action === 'delete' && this.props.onDelete) {
            this.props.onDelete(this.props.id);
        }

        if (action === 'forward' && this.props.onForward) {
            this.props.onForward(this.props.id);
        }
    }

    render() {
        return compile(template, this.props);
    }
}

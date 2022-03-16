import ChatController from './ChatControllers';
import AuthControllers from './AuthControllers';
import MessageWSController from './MessageWsController';
import UserController from './UserControllers';

export const authControllers = new AuthControllers();
export const messageController = new MessageWSController();
export const chatController = new ChatController();
export const userController = new UserController();

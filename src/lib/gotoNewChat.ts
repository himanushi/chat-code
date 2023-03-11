import { v4 as uuid } from 'uuid';
import { goto } from '$app/navigation';

export const gotoNewChat = () => goto(`/chat/${uuid()}`);

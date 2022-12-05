export interface Message {
  _URI: 'Message';
  kind: string;
  status: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface ErrorMessage extends Omit<Message, 'status'> {
  status: 'error';
}
export interface SuccessMessage extends Omit<Message, 'status'> {
  status: 'success';
}
const _URI = 'Message' as const;

type MessageParams = Omit<Message, '_URI' | 'kind' | 'message'> &
  Partial<Pick<Message, 'kind' | 'message'>>;
const defaultData = { kind: '', message: '' };
export function message(params: MessageParams) {
  return { _URI, ...defaultData, ...params } as Message;
}
export function errorMessage(params: Omit<MessageParams, 'status'>) {
  return message({ ...params, status: 'error' }) as ErrorMessage;
}
export function successMessage(params: Omit<MessageParams, 'status'>) {
  return message({ ...params, status: 'success' }) as SuccessMessage;
}

// custom type gurad
export const isMessage = (o: unknown): o is Message => {
  if (typeof o === 'object' && o !== null && '_URI' in o) {
    return (o as { _URI: unknown })._URI === _URI;
  }
  return false;
};

export const isErrorMessage = (o: unknown): o is ErrorMessage => {
  return isMessage(o) && o.status === 'error';
};

export const isSuccessMessage = (
  o: unknown,
): o is Omit<Message, 'status'> & { status: 'success' } => {
  return isMessage(o) && o.status === 'success';
};

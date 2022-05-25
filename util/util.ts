import { message } from 'antd'

export function checkPhone (phoneNumber: string){
    const rule = /^1[3456789]\d{9}$/
    return rule.test(phoneNumber)
}

export const info = (text: string) => {
    message.info(text);
}

export const success = (text: string) => {
    message.success(text);
};
  
export const error = (text: string) => {
    message.error(text);
};
  
export const warning = (text: string) => {
    message.warning(text);
}
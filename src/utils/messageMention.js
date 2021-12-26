import { message } from 'antd'
import 'antd/es/message/style/css'

export default function messageMention(props) {
  if (props && props instanceof Object) {
    switch (props.type) {
      case 'success':
        return message.success({ ...props })
      case 'error':
        return message.error({ ...props })
      case 'warning':
        return message.warning({ ...props })
      case 'warn':
        return message.warn({ ...props })
      case 'loading':
        return message.loading({ ...props })
      default:
        return message.open({ ...props })
    }
  }
  if (typeof props === 'string') {
    return message.open({ content: props })
  }
  return message.error()
}

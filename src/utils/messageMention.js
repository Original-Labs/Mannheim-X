import { message } from 'antd'
import 'antd/es/message/style/css'

/*
   *函数注释
   *@ props:{
        param {string} className 自定义CSS
        param {ReactNode} content 提示内容
        param {number} duration 自动关闭的延时，单位秒。设为 0 时不自动关闭
        param {ReactNode} icon 自定义图标
        param {string | number} key 当前提示的唯一标志
        param {CSSProperties} style 自定义内联样式
        param {function} onClick 点击 message 时触发的回调函数
        param {function} onClose 关闭时触发的回调函数
    }
   *@ return 
   */

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
  if (props && props instanceof String) {
    return message.open(props)
  }
  return message.error()
}

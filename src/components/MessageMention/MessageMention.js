import { message } from 'antd'
import 'antd/es/message/style/css'

/**
 *
 * @param
 *     loading:boolean; //  是否加载
 *     delay:number;  // 加载延迟多少秒
 *     indicator:ReactNode; // 加载指示符(自定义icon)
 *     spining:boolean; // 是否为加载状态
 *     tip:ReactNode; // 当作包裹元素时,可以自定义描述文案
 *     wrapperClassName:string; // 包装器的类属性
 * @returns
 */
export default function MessageMention() {
  return <div onClick={message.info('这是一个组件消息')} />
}

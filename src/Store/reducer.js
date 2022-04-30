import poolAvatar from '../assets/poolAvatar.png'

//默认数据
const defaultState = {
  banner: '暂无广播',
  poolList: [
    {
      poolId: 1,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#1',
      description: '1个认购池的描述'
    },
    {
      poolId: 2,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#2',
      description: '2个认购池的描述'
    },
    {
      poolId: 3,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#3',
      description: '3个认购池的描述'
    },
    {
      poolId: 4,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#4',
      description: '4个认购池的描述'
    },
    {
      poolId: 5,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#5',
      description: '5个认购池的描述'
    },
    {
      poolId: 6,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#6',
      description: '6个认购池的描述'
    },
    {
      poolId: 7,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#7',
      description: '7个认购池的描述'
    },
    {
      poolId: 8,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#8',
      description: '8个认购池的描述'
    },
    {
      poolId: 9,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#9',
      description: '9个认购池的描述'
    },
    {
      poolId: 10,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#10',
      description: '10个认购池的描述'
    },
    {
      poolId: 11,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#11',
      description: '11个认购池的描述'
    },
    {
      poolId: 12,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#12',
      description: '12个认购池的描述'
    },
    {
      poolId: 13,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#13',
      description: '13个认购池的描述'
    },
    {
      poolId: 14,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#14',
      description: '14个认购池的描述'
    },
    {
      poolId: 15,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#15',
      description: '15个认购池的描述'
    },
    {
      poolId: 16,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#16',
      description: '16个认购池的描述'
    },
    {
      poolId: 17,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#17',
      description: '17个认购池的描述'
    },
    {
      poolId: 18,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#18',
      description: '18个认购池的描述'
    },
    {
      poolId: 19,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#19',
      description: '19个认购池的描述'
    },
    {
      poolId: 20,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#20',
      description: '20个认购池的描述'
    },
    {
      poolId: 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#21',
      description: '21个认购池的描述'
    }
  ],
  searchList: [],
  subscribeList: [],
  inputValue: null
}

export default (state = defaultState, action) => {
  //就是一个方法函数
  if (action.type === 'changeInput') {
    let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
    newState.inputValue = action.value
    console.log('newState:', newState.inputValue)
    return newState
  }
  if (action.type === 'searchList') {
    let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
    newState.searchList = action.value
    return newState
  }
  if (action.type === 'getList') {
    let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
    newState.poolList = action.value
    return newState
  }
  if (action.type === 'setBanner') {
    let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
    newState.banner = action.value
    return newState
  }
  return state
}

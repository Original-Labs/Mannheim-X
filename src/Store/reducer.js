import poolAvatar from '../assets/logo.png'

//默认数据
const defaultState = {
  banner: '暂无广播',
  poolList: [
    {
      poolId: 1,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#A',
      description: '1个认购池的描述',
      backColor: '#212121'
    },
    {
      poolId: 2,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#B',
      description: '2个认购池的描述',
      backColor: '#61998c'
    },
    {
      poolId: 3,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#C',
      description: '3个认购池的描述',
      backColor: '#e8c77a'
    },
    {
      poolId: 4,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#D',
      description: '4个认购池的描述',
      backColor: '#7b7168'
    },
    {
      poolId: 5,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#E',
      description: '5个认购池的描述',
      backColor: '#9beca9'
    },
    {
      poolId: 6,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#F',
      description: '6个认购池的描述',
      backColor: '#6c8cbb'
    },
    {
      poolId: 7,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#G',
      description: '7个认购池的描述',
      backColor: '#82dbd9'
    },
    {
      poolId: 8,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#H',
      description: '8个认购池的描述',
      backColor: '#212121'
    },
    {
      poolId: 9,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#I',
      description: '9个认购池的描述',
      backColor: '#61998c'
    },
    {
      poolId: 10,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#J',
      description: '10个认购池的描述',
      backColor: '#e8c77a'
    },
    {
      poolId: 11,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#K',
      description: '11个认购池的描述',
      backColor: '#7b7168'
    },
    {
      poolId: 12,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#L',
      description: '12个认购池的描述',
      backColor: '#9beca9'
    },
    {
      poolId: 13,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#M',
      description: '13个认购池的描述',
      backColor: '#6c8cbb'
    },
    {
      poolId: 14,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#N',
      description: '14个认购池的描述',
      backColor: '#82dbd9'
    },
    {
      poolId: 15,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#O',
      description: '15个认购池的描述',
      backColor: '#212121'
    },
    {
      poolId: 16,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#P',
      description: '16个认购池的描述',
      backColor: '#61998c'
    },
    {
      poolId: 17,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#Q',
      description: '17个认购池的描述',
      backColor: '#e8c77a'
    },
    {
      poolId: 18,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#R',
      description: '18个认购池的描述',
      backColor: '#7b7168'
    },
    {
      poolId: 19,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#S',
      description: '19个认购池的描述',
      backColor: '#9beca9'
    },
    {
      poolId: 20,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#T',
      description: '20个认购池的描述',
      backColor: '#6c8cbb'
    },
    {
      poolId: 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#U',
      description: '21个认购池的描述',
      backColor: '#82dbd9'
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

import poolAvatar from '../assets/logo.png'

//默认数据
const defaultState = {
  banner: '暂无广播',
  poolList: [
    {
      poolWord: 'A',
      poolId: 1,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#A',
      description: 'Mannheim X认购开启',
      backColor: '#b3b7b8'
    },
    {
      poolWord: 'B',
      poolId: 2,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#B',
      description: 'Mannheim X认购开启',
      backColor: '#61998c'
    },
    {
      poolWord: 'C',
      poolId: 3,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#C',
      description: 'Mannheim X认购开启',
      backColor: '#e8c77a'
    },
    {
      poolWord: 'D',
      poolId: 4,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#D',
      description: 'Mannheim X认购开启',
      backColor: '#7b7168'
    },
    {
      poolWord: 'E',
      poolId: 5,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#E',
      description: 'Mannheim X认购开启',
      backColor: '#9beca9'
    },
    {
      poolWord: 'F',
      poolId: 6,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#F',
      description: 'Mannheim X认购开启',
      backColor: '#6c8cbb'
    },
    {
      poolWord: 'G',
      poolId: 7,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#G',
      description: 'Mannheim X认购开启',
      backColor: '#82dbd9'
    },
    {
      poolWord: 'H',
      poolId: 8,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#H',
      description: 'Mannheim X认购开启',
      backColor: '#b3b7b8'
    },
    {
      poolWord: 'I',
      poolId: 9,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#I',
      description: 'Mannheim X认购开启',
      backColor: '#61998c'
    },
    {
      poolWord: 'J',
      poolId: 10,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#J',
      description: 'Mannheim X认购开启',
      backColor: '#e8c77a'
    },
    {
      poolWord: 'K',
      poolId: 11,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#K',
      description: 'Mannheim X认购开启',
      backColor: '#7b7168'
    },
    {
      poolWord: 'L',
      poolId: 12,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#L',
      description: 'Mannheim X认购开启',
      backColor: '#9beca9'
    },
    {
      poolWord: 'M',
      poolId: 13,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#M',
      description: 'Mannheim X认购开启',
      backColor: '#6c8cbb'
    },
    {
      poolWord: 'N',
      poolId: 14,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#N',
      description: 'Mannheim X认购开启',
      backColor: '#82dbd9'
    },
    {
      poolWord: 'O',
      poolId: 15,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#O',
      description: 'Mannheim X认购开启',
      backColor: '#b3b7b8'
    },
    {
      poolWord: 'P',
      poolId: 16,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#P',
      description: 'Mannheim X认购开启',
      backColor: '#61998c'
    },
    {
      poolWord: 'Q',
      poolId: 17,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#Q',
      description: 'Mannheim X认购开启',
      backColor: '#e8c77a'
    },
    {
      poolWord: 'R',
      poolId: 18,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#R',
      description: 'Mannheim X认购开启',
      backColor: '#7b7168'
    },
    {
      poolWord: 'S',
      poolId: 19,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#S',
      description: 'Mannheim X认购开启',
      backColor: '#9beca9'
    },
    {
      poolWord: 'T',
      poolId: 20,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#T',
      description: 'Mannheim X认购开启',
      backColor: '#6c8cbb'
    },
    {
      poolWord: 'U',
      poolId: 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#U',
      description: 'Mannheim X认购开启',
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

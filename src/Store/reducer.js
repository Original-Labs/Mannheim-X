import poolAvatar from '../assets/logo.png'

// 默认数据
// const defaultState = {
//   banner: '暂无广播',
//   poolList: [
//     {
//       uri: '1',
//       poolWord: 'A',
//       poolId: 22,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#A',
//       description: 'Mannheim X认购开启',
//       backColor: '#b3b7b8'
//     },
//     {
//       uri: '2',
//       poolWord: 'B',
//       poolId: 23,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#B',
//       description: 'Mannheim X认购开启',
//       backColor: '#61998c'
//     },
//     {
//       uri: '3',
//       poolWord: 'C',
//       poolId: 24,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#C',
//       description: 'Mannheim X认购开启',
//       backColor: '#e8c77a'
//     },
//     {
//       uri: '4',
//       poolWord: 'D',
//       poolId: 25,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#D',
//       description: 'Mannheim X认购开启',
//       backColor: '#7b7168'
//     },
//     {
//       uri: '5',
//       poolWord: 'E',
//       poolId: 26,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#E',
//       description: 'Mannheim X认购开启',
//       backColor: '#9beca9'
//     },
//     {
//       uri: '6',
//       poolWord: 'F',
//       poolId: 27,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#F',
//       description: 'Mannheim X认购开启',
//       backColor: '#6c8cbb'
//     },
//     {
//       uri: '7',
//       poolWord: 'G',
//       poolId: 28,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#G',
//       description: 'Mannheim X认购开启',
//       backColor: '#82dbd9'
//     },
//     {
//       uri: '8',
//       poolWord: 'H',
//       poolId: 29,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#H',
//       description: 'Mannheim X认购开启',
//       backColor: '#b3b7b8'
//     },
//     {
//       uri: '9',
//       poolWord: 'I',
//       poolId: 30,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#I',
//       description: 'Mannheim X认购开启',
//       backColor: '#61998c'
//     },
//     {
//       uri: '10',
//       poolWord: 'J',
//       poolId: 31,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#J',
//       description: 'Mannheim X认购开启',
//       backColor: '#e8c77a'
//     },
//     {
//       uri: '11',
//       poolWord: 'K',
//       poolId: 32,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#K',
//       description: 'Mannheim X认购开启',
//       backColor: '#7b7168'
//     },
//     {
//       uri: '12',
//       poolWord: 'L',
//       poolId: 33,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#L',
//       description: 'Mannheim X认购开启',
//       backColor: '#9beca9'
//     },
//     {
//       uri: '13',
//       poolWord: 'M',
//       poolId: 34,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#M',
//       description: 'Mannheim X认购开启',
//       backColor: '#6c8cbb'
//     },
//     {
//       uri: '14',
//       poolWord: 'N',
//       poolId: 35,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#N',
//       description: 'Mannheim X认购开启',
//       backColor: '#82dbd9'
//     },
//     {
//       uri: '15',
//       poolWord: 'O',
//       poolId: 36,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#O',
//       description: 'Mannheim X认购开启',
//       backColor: '#b3b7b8'
//     },
//     {
//       uri: '16',
//       poolWord: 'P',
//       poolId: 37,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#P',
//       description: 'Mannheim X认购开启',
//       backColor: '#61998c'
//     },
//     {
//       uri: '17',
//       poolWord: 'Q',
//       poolId: 38,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#Q',
//       description: 'Mannheim X认购开启',
//       backColor: '#e8c77a'
//     },
//     {
//       uri: '18',
//       poolWord: 'R',
//       poolId: 39,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#R',
//       description: 'Mannheim X认购开启',
//       backColor: '#7b7168'
//     },
//     {
//       uri: '19',
//       poolWord: 'S',
//       poolId: 40,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#S',
//       description: 'Mannheim X认购开启',
//       backColor: '#9beca9'
//     },
//     {
//       uri: '20',
//       poolWord: 'T',
//       poolId: 41,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#T',
//       description: 'Mannheim X认购开启',
//       backColor: '#6c8cbb'
//     },
//     {
//       uri: '21',
//       poolWord: 'U',
//       poolId: 42,
//       rank: 0,
//       avatar: poolAvatar,
//       title: '认购池#U',
//       description: 'Mannheim X认购开启',
//       backColor: '#82dbd9'
//     }
//   ],
//   searchList: [],
//   subscribeList: [],
//   inputValue: null
// }

const defaultState = {
  banner: '暂无广播',
  poolList: [
    {
      uri: '1',
      poolWord: 'A',
      poolId: 22 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#A',
      description: 'Mannheim X认购开启',
      backColor: '#b3b7b8'
    },
    {
      uri: '2',
      poolWord: 'B',
      poolId: 23 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#B',
      description: 'Mannheim X认购开启',
      backColor: '#61998c'
    },
    {
      uri: '3',
      poolWord: 'C',
      poolId: 24 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#C',
      description: 'Mannheim X认购开启',
      backColor: '#e8c77a'
    },
    {
      uri: '4',
      poolWord: 'D',
      poolId: 25 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#D',
      description: 'Mannheim X认购开启',
      backColor: '#7b7168'
    },
    {
      uri: '5',
      poolWord: 'E',
      poolId: 26 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#E',
      description: 'Mannheim X认购开启',
      backColor: '#9beca9'
    },
    {
      uri: '6',
      poolWord: 'F',
      poolId: 27 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#F',
      description: 'Mannheim X认购开启',
      backColor: '#6c8cbb'
    },
    {
      uri: '7',
      poolWord: 'G',
      poolId: 28 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#G',
      description: 'Mannheim X认购开启',
      backColor: '#82dbd9'
    },
    {
      uri: '8',
      poolWord: 'H',
      poolId: 29 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#H',
      description: 'Mannheim X认购开启',
      backColor: '#b3b7b8'
    },
    {
      uri: '9',
      poolWord: 'I',
      poolId: 30 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#I',
      description: 'Mannheim X认购开启',
      backColor: '#61998c'
    },
    {
      uri: '10',
      poolWord: 'J',
      poolId: 31 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#J',
      description: 'Mannheim X认购开启',
      backColor: '#e8c77a'
    },
    {
      uri: '11',
      poolWord: 'K',
      poolId: 32 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#K',
      description: 'Mannheim X认购开启',
      backColor: '#7b7168'
    },
    {
      uri: '12',
      poolWord: 'L',
      poolId: 33 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#L',
      description: 'Mannheim X认购开启',
      backColor: '#9beca9'
    },
    {
      uri: '13',
      poolWord: 'M',
      poolId: 34 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#M',
      description: 'Mannheim X认购开启',
      backColor: '#6c8cbb'
    },
    {
      uri: '14',
      poolWord: 'N',
      poolId: 35 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#N',
      description: 'Mannheim X认购开启',
      backColor: '#82dbd9'
    },
    {
      uri: '15',
      poolWord: 'O',
      poolId: 36 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#O',
      description: 'Mannheim X认购开启',
      backColor: '#b3b7b8'
    },
    {
      uri: '16',
      poolWord: 'P',
      poolId: 37 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#P',
      description: 'Mannheim X认购开启',
      backColor: '#61998c'
    },
    {
      uri: '17',
      poolWord: 'Q',
      poolId: 38 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#Q',
      description: 'Mannheim X认购开启',
      backColor: '#e8c77a'
    },
    {
      uri: '18',
      poolWord: 'R',
      poolId: 39 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#R',
      description: 'Mannheim X认购开启',
      backColor: '#7b7168'
    },
    {
      uri: '19',
      poolWord: 'S',
      poolId: 40 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#S',
      description: 'Mannheim X认购开启',
      backColor: '#9beca9'
    },
    {
      uri: '20',
      poolWord: 'T',
      poolId: 41 - 21,
      rank: 0,
      avatar: poolAvatar,
      title: '认购池#T',
      description: 'Mannheim X认购开启',
      backColor: '#6c8cbb'
    },
    {
      uri: '21',
      poolWord: 'U',
      poolId: 42 - 21,
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

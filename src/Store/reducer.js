//默认数据
const defaultState = {
  banner: '这是页面的广告栏,横向移动,循环播放',
  poolList: [
    {
      poolId: 1,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jess',
      title: '1个认购池的标题',
      description: '1个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 2,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/joe',
      title: '2个认购池的标题',
      description: '2个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 3,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/josh',
      title: '3个认购池的标题',
      description: '3个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 4,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jake',
      title: '4个认购池的标题',
      description: '4个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 5,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jeane',
      title: '5个认购池的标题',
      description: '5个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 6,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jodi',
      title: '6个认购池的标题',
      description: '6个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 7,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jai',
      title: '7个认购池的标题',
      description: '7个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 8,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jordan',
      title: '8个认购池的标题',
      description: '8个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 9,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jeri',
      title: '9个认购池的标题',
      description: '9个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 10,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jazebelle',
      title: '10个认购池的标题',
      description: '10个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 11,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jacques',
      title: '11个认购池的标题',
      description: '11个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 12,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jana',
      title: '12个认购池的标题',
      description: '12个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 13,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/julie',
      title: '13个认购池的标题',
      description: '13个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 14,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jerry',
      title: '14个认购池的标题',
      description: '14个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 15,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jocelyn',
      title: '15个认购池的标题',
      description: '15个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 16,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/josephine',
      title: '16个认购池的标题',
      description: '16个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 17,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jack',
      title: '17个认购池的标题',
      description: '17个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 18,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jane',
      title: '18个认购池的标题',
      description: '18个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 19,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/jed',
      title: '19个认购池的标题',
      description: '19个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    },
    {
      poolId: 20,
      rank: 0,
      avatar: 'https://joeschmoe.io/api/v1/james',
      title: '20个认购池的标题',
      description: '20个认购池的描述',
      banner: '这是页面的广告栏,横向移动,循环播放'
    }
  ],
  searchList: [],
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

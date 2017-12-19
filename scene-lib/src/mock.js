const Mock = require('mockjs')
var Random = Mock.Random

var environment = ['室内', '室外']
var sceneStyles = ['现代', '古装', '科幻', '校园', '惊悚', '爱情', '公路', '悬疑', '文艺', '动作', '喜剧', '警匪']
var placeTypes = ['摄影棚', '办公区', '餐厅', '咖啡馆', '公园/植物园', '游乐场', '地标', '学校', '医院', '广场']
var manageMode = ['市政经营', '商业运行']

// 根据传入列表类型从中随机挑选项目，用于生成随机数据。可以优化。
function getSceneStyles (list, min = 0, max = 1) {
  var random = Math.random
  var nums = Math.floor(random() * max + min)
  let iset = new Set()
  for (var i = 0; i < nums; i++) {
    let result = list[Math.floor(random() * list.length)]
    iset.has(result) ? i -= 1 : iset.add(result)
  }
  return iset
}

// 模拟首页场景点的数据
function getSceneItem () {
  var sceneItem = Mock.mock({
    'data': {
      'id|100-300': 1,
      'city|1': ['Chongqing', 'Beijing', 'Shanghai'],
      'name|1': Random.cword(2, 5),
      'favoriteNum|0-100': 1,
      'collectNum|0-100': 1,
      'environment|1': getSceneStyles(environment, 1, 1),
      'sceneStyles': getSceneStyles(sceneStyles, 2, 4),
      'manageMode|1-2': getSceneStyles(manageMode, 1, 2),
      'placeTypes': getSceneStyles(placeTypes, 1, 3),
      'img': function () {
        return Random.image('290x162', Random.color(), this.id)
      }
    }
  })
  return sceneItem.data
}

// 模拟首页场景场景点列表
let sceneList = new Set()
for (var i = 0; i < 30; i++) {
  var item = getSceneItem()
  sceneList.add(item)
}

// 生成场景点图片的信息
function getImageItem () {
  return Mock.mock({
    'productor|1': ['Panasonic', 'Canon', 'Sony'],
    'model': '未知',
    'lenProductor|1': ['徕卡', '蔡司'],
    'lenVersion': '未知',
    'capturedTime|0-1440': 1,
    'derection|1': ['东', '南', '西', '北'],
    'flashlight': 'Exif版本',
    'gps': 'unknown',
    'aperture': 'unknown',
    'ISOspeed|1': [200, 400, 600, 800, 1600],
    'src': function () {
      return Random.image('916x506', Random.color(), this.id)
    }
  })
}

// 模拟场景点详情页的数据
function getSceneDetail (sceneID) {
  let iScene = {}
  sceneList.forEach((item) => {
    if (item.id === parseInt(sceneID)) {
      iScene = item
    }
  })
  let otherDetail = Mock.mock({
    'belongTo|1': Random.cword(2, 5),
    'tools|2-4': ['@cword(2, 4)'],
    'filmedTeams|1-10': [
      {
        'name': '@cword(3, 5)',
        'directors|1-3': ['@cname'],
        'submiter': '@cname',
        'img': Random.image('20x20', Random.color())
      }
    ]
  })
  // return iScene
  let detail = Mock.mock({
    'images': new Array(~~(Math.random() * 15) + 8).fill(0).map(() => {
      return getImageItem()
    })
  })
  return Object.assign({}, iScene, detail, otherDetail)
}

// 模拟场景详情页的数据
function getAreaDetail (areaID) {
  let areaDetail = Mock.mock({
    'name': '@cword(3, 5)',
    'lastUpdate': '@date("yyyy-MM-dd")',
    'favorite|1-30': 1,
    'banner': Random.image('900x400', Random.color()),
    'scenes|5-20': [
      {
        'id|100-300': 1,
        'name': '@cword(3, 5)',
        'img': Random.image('200x200', Random.color(), '@string')
      }
    ],
    'tags|2-5': ['@cword(3, 5)'],
    'sceneInfo': {
      'address': '@city',
      'openTime|1': ['全天开放', '早9点至晚9点'],
      'electricity_supply': '供电',
      'water_supply': '供水',
      'transport': '提供搬运'
    },
    'hotelRecommend|2-5': [
      {
        'name': '@cword(4, 6)',
        'img': Random.image('200x200', Random.color(), '@string')
      }
    ],
    'restaurantRecommend|2-5': ['@cword(3, 5)'],
    'filmedTeams|1-10': [
      {
        'name': '@cword(3, 5)',
        'directors|1-3': ['@cname'],
        'submiter': '@cname',
        'img': Random.image('20x20', Random.color())
      }
    ]
  })
  return areaDetail
}

// mock首页相关场景的数据
let sceneRelated = Mock.mock({
  'sceneRelated|1-4': [
    {
      'name': '@cword(3, 5)',
      'id|100-999': 1,
      'img': Random.image('190x102', Random.color())
    }
  ]
})

// 模拟首页搜索的返回数据
Mock.mock('/api/data', (req, res) => {
  return {
    data: sceneList,
    sceneRelated: sceneRelated.sceneRelated
  }
})

// 模拟场景点详情页的返回数据
Mock.mock(/api\/detail\/(\d+)$/, (req, res) => {
  let sceneID = (/api\/detail\/(\d+)$/).exec(req.url)[1]
  let iScene = getSceneDetail(sceneID)
  return iScene
})

// 模拟相关场景详情页的返回数据
Mock.mock(/api\/areaDetail\/(\d+)$/, (req, res) => {
  let areaID = (/api\/areaDetail\/(\d+)$/).exec(req.url)[1]
  let iArea = getAreaDetail(areaID)
  return iArea
})

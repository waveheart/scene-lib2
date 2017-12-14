const Mock = require('mockjs')
var Random = Mock.Random

var sceneStyles = ['现代', '古装', '科幻', '校园', '惊悚', '爱情', '公路', '悬疑', '文艺', '动作', '喜剧', '警匪']
var placeTypes = ['摄影棚', '办公区', '餐厅', '咖啡馆', '公园/植物园', '游乐场', '地标', '学校', '医院', '广场']
var manageMode = ['市政经营', '商业运行']

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

function getSceneItem () {
  var sceneItem = Mock.mock({
    'data': {
      'id|100-300': 1,
      'city|1': ['Chongqing', 'Beijing', 'Shanghai'],
      'name|1': Random.cword(2, 5),
      'environment|1': ['室内', '室外'],
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

let sceneList = new Set()
for (var i = 0; i < 30; i++) {
  var item = getSceneItem()
  sceneList.add(item)
}

Mock.mock('/api/data', (req, res) => {
  return {
    data: sceneList
  }
})

Mock.mock(/api\/detail\/(\d+)$/, (req, res) => {
  let sceneID = (/api\/detail\/(\d+)$/).exec(req.url)[1]
  let iScene = {}
  sceneList.forEach((item) => {
    if (item.id === parseInt(sceneID)) {
      iScene = item
    }
  })
  console.log(iScene)
  return {
    data: {
      erro: 0
    }
  }
})

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const testData = 
  [
    {
      "image": "/resources/wet_1.jpg",
      "mode": "aspectFill",
      "answer":1
    },
    {
      "image": "/resources/wet_2.jpg",
      "mode": "aspectFill",
      "answer": 1
    },
    {
      "image": "/resources/wet_3.jpg",
      "mode": "aspectFill",
      "answer": 1
    },
    {
      "image": "/resources/wet_4.jpg",
      "mode": "aspectFill",
      "answer": 1
    }
  ]

module.exports = {
  formatTime: formatTime,
  testData: testData
}

import React from 'react';
import logo from './logo.svg';
import './App.css';

let logs=`
2020-03-12T17:49:38.501Z user0 [order] ecs.se1.large[x15] cmaqmfterkm
2020-03-13T03:53:43.405Z user2 [order] ecs.c5.xlarge[x40] jn61xw47x3g
2020-03-13T04:21:19.267Z user3 [order] ecs.g5.16xlarge[x28] hmom8xr848v
2020-03-13T15:46:58.815Z user0 [order] ecs.d1ne.14xlarge[x21] xxqpsdux8sa
2020-03-13T16:28:20.720Z user0 [order] ecs.r5.large[x45] sokwhnb97xh
2020-03-13T22:29:32.813Z user3 [order] ecs.g5.16xlarge[x7] b8jkovlxtm4
2020-03-14T01:39:21.517Z user2 [order] ecs.se1ne.large[x31] 7niyma7zm42
2020-03-14T07:11:55.465Z user2 [order] ecs.c5.xlarge[x6] dkwe4n96ra7
2020-03-14T08:16:30.776Z user3 [order] ecs.se1.large[x1] u2wij78wo
2020-03-14T15:28:08.484Z user4 [order] ecs.i2.2xlarge[x11] i62beynee4g
2020-03-14T19:37:30.512Z user4 [order] ecs.r5.large[x39] z2xmsberqv
2020-03-14T20:22:10.379Z user3 [order] ecs.se1.large[x17] y9ny3u9y86e
2020-03-15T08:23:43.760Z user0 [order] ecs.d1ne.14xlarge[x16] 1h6b7oycyn7
2020-03-15T10:31:55.513Z user3 [order] ecs.se1ne.large[x36] 1pm951rlg52
2020-03-15T12:03:35.578Z user2 [order] ecs.c5.xlarge[x14] udzsmws386
2020-03-15T15:35:55.672Z user0 [order] ecs.d1ne.14xlarge[x8] ip6ciiofpw
2020-03-15T18:46:27.013Z user0 [order] ecs.c5.xlarge[x39] 9xiyxd6tuh
2020-03-15T19:57:51.400Z user2 [order] ecs.se1.large[x29] 1z9nlq8x8gx
2020-03-15T23:46:59.898Z user4 [order] ecs.se1.large[x27] qvwym9482xe
2020-03-15T23:58:25.324Z user1 [order] ecs.se1ne.large[x46] qrgmndzalfr
2020-03-16T03:50:59.340Z user4 [order] ecs.g5.16xlarge[x9] d9nz8w7ex4u
2020-03-16T05:09:02.493Z user4 [order] ecs.d1ne.14xlarge[x38] cyg4z81y1v
2020-03-16T08:55:55.642Z user2 [order] ecs.c5.xlarge[x30] brunilviwzt
2020-03-16T16:38:27.480Z user0 [order] ecs.se1.large[x38] y8gh3jpayd
2020-03-16T22:07:11.532Z user1 [order] ecs.d1ne.14xlarge[x16] x33wl71qirs
2020-03-17T00:41:09.917Z user3 [order] ecs.se1.large[x25] jauwcsfbob
2020-03-17T01:22:27.291Z user1 [order] ecs.se1.large[x10] e9qcg8xmsln
2020-03-17T04:53:10.383Z user4 [order] ecs.se1ne.large[x19] irxqnw3y2to
2020-03-17T08:41:38.519Z user3 [order] ecs.d1ne.14xlarge[x16] omnc06colo
2020-03-17T09:36:22.984Z user2 [order] ecs.i2.2xlarge[x7] t0qyf44tctd
`
function parseLogsAndPrint(logs){
  if(!logs.length) {
    return "";
  }
  let logsArr = logs.split('\n').slice(1, logs.split('\n').length-1);
  const newLogs = logsArr.map((item, index) => {
    const arr = item.split(' ');
    const theDate = new Date(arr[0]);
    const y = theDate.getUTCFullYear(),
          m = theDate.getUTCMonth() + 1,
          d = theDate.getUTCDate();
    return {
      date: `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? "0" + d : d}`,
      name: arr[1],
      type: arr[3].slice(0, arr[3].indexOf('[')),
      count: parseInt(arr[3].slice(arr[3].indexOf('[') + 2, arr[3].indexOf(']'))),
    }
  });
  newLogs.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
    } else if (a.date > b.date) {
        return 1;
    } else {
        return 0;
    }
  })
  let obj = {};
  for(let i = 0; i< newLogs.length; i++) {
    const item = newLogs[i];
    let y = `${item.date}_${item.name}_${item.type}`
    if(!obj[y]) {
      obj[y] = item.count;
    } else {
      obj[y] += item.count;
    }
  }
  const list = []
  for(const k in obj) {
    const arr = k.split('_');
    list.push(
      `${arr[0]},${arr[1]}购买了${obj[k]}台${arr[2]}实例`
    )
  }
  console.log('obj', obj);
  console.log(' list.join',  list.join('\n'))
  return list.join('\n')
}


function App() {
  return (
    <div className="App">
      <div className="App-header">
      </div>
      <div className="mainbox">
        <div className="sidebar"></div>
        <div className="mycontent">{parseLogsAndPrint(logs)}</div>
      </div>
    </div>
  );
}

export default App;

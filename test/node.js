var express=require('express')
var app=express();


var data = {key: 'value', hello: 'world'};


app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", 'Express');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


app.listen(8080, function() {
  console.log('listening on localhost:8080');
});

app.all('/vue-element-admin/user/login',function(req,res) {
  var obj={"code":20000,"data":{"token":"admin-token"}};
  res.json(obj);
})
app.all('/vue-element-admin/user/info',function(req,res) {
  if (req.token='admin-token'){
    var obj={"code":20000,"data":{"roles":["admin"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}};
    res.json(obj);
  }else {
    var obj={
      code:2,
      msg:'失败了'
    }
    res.json(obj)
  }
})
app.all('/vue-element-admin/transaction/list',function(req,res) {
  var obj={"code":20000,"data":{"total":20,"items":[{"order_no":"6B923FF4-1514-Fc6b-Caba-1Bcd05eDBF49","timestamp":1450630342786,"username":"Gary White","price":12679,"status":"pending"},{"order_no":"5b48b7ED-Cfbf-A85f-Da94-Aa69E8e138DF","timestamp":1450630342786,"username":"Sarah Gonzalez","price":8431.72,"status":"pending"},{"order_no":"61B0cEAc-c9FC-0Cf4-bbD4-Cffb5D713Eb1","timestamp":1450630342786,"username":"Larry Williams","price":10046.57,"status":"success"},{"order_no":"EF25BdB3-6427-dbEd-B596-3c42f9CefB7b","timestamp":1450630342786,"username":"Eric Perez","price":6859.7,"status":"pending"},{"order_no":"9fC1c3cD-F78b-5684-cB20-dd6042e4f020","timestamp":1450630342786,"username":"Carol Garcia","price":13629.2,"status":"pending"},{"order_no":"7D0eB8B8-B2DA-fE1A-a2fC-78AEefF512F1","timestamp":1450630342786,"username":"Timothy White","price":1252.2,"status":"success"},{"order_no":"2e6eF9dE-454e-46FC-f369-44E9C2f7d9BC","timestamp":1450630342786,"username":"Michelle Robinson","price":4239,"status":"success"},{"order_no":"475D678f-2aFf-1934-3abb-dECAAC6e2fe8","timestamp":1450630342786,"username":"Ronald Lopez","price":3213.3,"status":"pending"},{"order_no":"FC854BE1-0Bc4-5bdC-CE43-476e90f6cDB6","timestamp":1450630342786,"username":"Jennifer Jones","price":2248.2,"status":"success"},{"order_no":"beB07823-fA86-f7b6-bfA6-694160EecCc3","timestamp":1450630342786,"username":"James Harris","price":14970.4,"status":"pending"},{"order_no":"5Cf6732F-C21c-Cf04-3D06-8B9bCb5CDefD","timestamp":1450630342786,"username":"Kenneth Gonzalez","price":1776.1,"status":"success"},{"order_no":"C3deC96C-e676-4AA8-5B4C-fEA7Bd196cfF","timestamp":1450630342786,"username":"Eric White","price":9132.4,"status":"pending"},{"order_no":"B41aa8E5-c2Af-FC50-8D5d-CDe9A758f89A","timestamp":1450630342786,"username":"Jason Thompson","price":4746.6,"status":"success"},{"order_no":"5ebEF8EC-BEE5-EAA8-bEA0-7B1A1bBE4289","timestamp":1450630342786,"username":"Richard Garcia","price":8231.3,"status":"success"},{"order_no":"7B8b98D0-2EA6-e6f1-6D04-De3DA40eFf5f","timestamp":1450630342786,"username":"Patricia Hall","price":12395,"status":"pending"},{"order_no":"B3AfbADd-F26C-CC75-a3e7-371fbBeCe875","timestamp":1450630342786,"username":"Jennifer Jones","price":9786.2,"status":"success"},{"order_no":"eCE9BfA8-3E3C-EeeC-D2E0-e300b6a7b5bB","timestamp":1450630342786,"username":"Michael Young","price":1381,"status":"success"},{"order_no":"d91c9864-Bf16-cfcf-Eabd-3983C02CDEa6","timestamp":1450630342786,"username":"Kenneth Young","price":8797,"status":"success"},{"order_no":"DE55BFb8-46c4-cDfC-4F8b-C118F9Adb8e7","timestamp":1450630342786,"username":"Larry Thomas","price":8883.4,"status":"success"},{"order_no":"B4FDb94c-74d5-5ea8-E2Be-fE10C34f1F0d","timestamp":1450630342786,"username":"Ruth Jones","price":8939.4,"status":"success"}]}};
  res.json(obj)
})
app.all('/coms',function(req,res) {
  var obj=[
    {
      'menuId': 1,
      'menuName': '系统管理',
      'childrenList': [
        {
          'menuId': 100,
          'menuName': '用户管理',
          'childrenList': [
            {
              'menuId': 1000,
              'menuName': '用户查询'
            },
            {
              'menuId': 1001,
              'menuName': '用户新增'
            },
            {
              'menuId': 1002,
              'menuName': '用户修改'
            },
            {
              'menuId': 1003,
              'menuName': '用户删除'
            },
            {
              'menuId': 1004,
              'menuName': '用户删除1'
            },
            {
              'menuId': 1005,
              'menuName': '用户删除2'
            },
            {
              'menuId': 1009,
              'menuName': '用户删除3'
            },
            {
              'menuId': 10010,
              'menuName': '用户删除4'
            }
          ]
        },
        {
          'menuId': 101,
          'menuName': '角色管理',
          'childrenList': [
            {
              'menuId': 1006,
              'menuName': '角色查询'
            },
            {
              'menuId': 1007,
              'menuName': '角色新增'
            },
            {
              'menuId': 1008,
              'menuName': '角色修改'
            },
            {
              'menuId': 1011,
              'menuName': '删除角色'
            }
          ]
        }
      ]
    }
  ];
  res.json(obj)
})
app.all('/users',function(req,res) {
  var obj=[
    {
      'menuId': 1,
      'menuName': '全选',
      'childrenList': [
        {
          'menuId': 100,
          'menuName': '用户1'
        },
        {
          'menuId': 101,
          'menuName': '用户2'
        }
      ]
    }
  ];
  res.json(obj)
})
app.all('/apptypes',function(req,res) {
  var obj=[
    {
      'menuId': 1,
      'menuName': '全选',
      'childrenList': [
        {
          'menuId': 100,
          'menuName': '方式1'
        },
        {
          'menuId': 101,
          'menuName': '方式2'
        }
      ]
    }
  ];
  var obj1=[

    {
      'menuId': 100,
      'menuName': '方式1'
    },
    {
      'menuId': 101,
      'menuName': '方式2'
    }
  ];
  res.json(obj1)
})
app.all('/apps',function(req,res) {
  var obj=[
    {
      'menuId': 1,
      'menuName': '全选',
      'childrenList': [
        {
          'menuId': 100,
          'menuName': '软件1'
        },
        {
          'menuId': 101,
          'menuName': '软件2'
        }
      ]
    }
  ];
  res.json(obj)
})
app.all('/modules',function(req,res) {
  var obj=[
    {
      'menuId': 1,
      'menuName': '全选',
      'childrenList': [
        {
          'menuId': 100,
          'menuName': '模块1'
        },
        {
          'menuId': 101,
          'menuName': '模块2'
        }
      ]
    }
  ];
  res.json(obj)
})






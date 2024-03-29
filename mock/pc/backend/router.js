var Router = require("express").Router;
var router = new Router();


router.get("/pc/operation/warmup/list/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json(
            {"msg": [
                {
                    "id": 1,
                    "question": "请找出下列各组词语中，和组内其它词语范围不同的词第一组：微博、博客、自媒体、知乎专栏、微信公众号、头条号第二组：意大利肉酱面、上海红烧肉、韩国泡菜、西班牙海鲜饭、德国猪手、日本料理、炸鱼薯条、泰式冬阴功汤第三组：公司文化、薪资福利、发展机会、管理团队、行业前景、住房公积金、公司声誉",
                    "type": 1,
                    "analysis": "第一组里，其它都是内容平台，只有“自媒体”不是；第二组里，其它都是菜名（炸鱼薯条是英国特色菜名），只有“日本料理”不是；第三组里，呈现了择业的一些考虑因素，但“住房公积金”属于“薪资福利”，相较其它因素，范围较小",
                    "voice": null,
                    "difficulty": 3,
                    "knowledgeId": 1,
                    "sceneId": 1,
                    "del": false,
                    "problemId": 1,
                    "sequence": 1,
                    "example": true,
                    "practiceUid": "T001A001A002L01001",
                    "score": null,
                    "choiceList": null,
                    "discussList": null,
                    "choice": null
                },
                {
                    "id": 2,
                    "question": "请判断以下这段话是否符合分层归类的要求。有效获取医学信息的来源有：1、书：医学教材、通俗医学参考书2、媒体：医生的自媒体、医学报刊3、互联网：医学论坛、维基百科、MOOC公开课",
                    "type": 1,
                    "analysis": "媒体和互联网存在交叉（如医生的自媒体），可将所有的信息来源分为线上和线下",
                    "voice": null,
                    "difficulty": 3,
                    "knowledgeId": 1,
                    "sceneId": 1,
                    "del": false,
                    "problemId": 1,
                    "sequence": 4,
                    "example": false,
                    "practiceUid": "TT001A001A006X01004",
                    "score": null,
                    "choiceList": null,
                    "discussList": null,
                    "choice": null
                },
                {
                    "id": 3,
                    "question": "小明同学计划通过以下方式来提升自己的能力，请帮他对这些方式进行分层归类。1、 读《金字塔原理》2、 每天早上计划好当天的任务3、 报名圈外的结构化思维训练营课程4、 一周至少在公开场合发言一次5、 每天总结工作中遇到的问题和改进方向6、 尝试用圈圈教的讲故事的方法说服领导同意自己的方案7、 使用番茄时间进行时间管理",
                    "type": 1,
                    "analysis": "1、3为“思维能力”；4、6为”沟通能力“；2、5、7为“计划执行能力”",
                    "voice": null,
                    "difficulty": 3,
                    "knowledgeId": 1,
                    "sceneId": 1,
                    "del": false,
                    "problemId": 1,
                    "sequence": 5,
                    "example": false,
                    "practiceUid": "TT001A001B004X01005",
                    "score": null,
                    "choiceList": null,
                    "discussList": null,
                    "choice": null
                },
                {
                    "id": 4,
                    "question": "下面是时光网用户写的关于李安最新电影《比利·林恩的中场战事》的微影评，如果要从3个不同角度对影评归类分组以便更好地理解大家对该电影的看法，你建议如何分组？1、男主角的眼神太杀，舞台功力爆表。2、120帧真的好清楚，3、头发一根根的毛茸茸的质感，想去伸手摸。4、比技术更震撼人心的依旧是安叔暗藏汹涌的叙述5、选角很成功可以说每个演员都演得很到位。6、4K120帧真的震撼到我了7、故事很简单，但挺细腻的8、李安讲的不是什么精彩的故事，而是人物状态构建出的社会状态。9、看的60帧，感觉是有些所谓的“高清”效果",
                    "type": 1,
                    "analysis": "第一组：1、5；第二组：2、3、6、9；第三组：4、7、8。第一组是关于演员，第二组是关于画面，第三组是关于剧情",
                    "voice": null,
                    "difficulty": 3,
                    "knowledgeId": 1,
                    "sceneId": 1,
                    "del": false,
                    "problemId": 1,
                    "sequence": 6,
                    "example": false,
                    "practiceUid": "TT001A001D003X01006",
                    "score": null,
                    "choiceList": null,
                    "discussList": null,
                    "choice": null
                }],
                "code":200});
    }, Math.random() * 1500);
});

router.post("/pc/operation/highlight/discuss/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": "ok"
        }), Math.random() * 1500)
});

router.post("/pc/operation/highlight/applicationSubmit/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": "ok"
        }), Math.random() * 1500)
});

router.get("/pc/operation/application/submit/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": [
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "<p>关键词：收购、EMC、戴尔</p><p>反问：戴尔不收购EMC会怎么样？&nbsp;<span style='line-height: 1.6; background-color: transparent;'>&nbsp;</span></p><p><span style='line-height: 1.6; background-color: transparent;'>为什么戴尔不收购其他公司？&nbsp;</span></p><p><span style='line-height: 1.6; background-color: transparent;'>为什么不是其他公司收购EMC？</span></p><p>1.戴尔不收购EMC会怎么样？戴尔的主要业务是PC，而PC市场整体低迷，戴尔再不做出转型，将无法在市场上立足；</p><p>2. 为什么戴尔不收购其他公司？戴尔想要发展转型成为一家企业计算机服务提供商，EMC和戴尔产品互补，可以帮助其达成该目标。通过收购EMC，可将戴尔公司在小企业领域和中端市场上的优势与EMC在大企业领域中的优势结合到一起，可以整合服务器、存储、网络、安全、管理、软件、服务等多个方面的资源，形成帮扶企业用户建云过程中构建一个全面的解决方案，并会协助各种培训提供支持，从基础架构到云端提供全面帮助。通过收购EMC，戴尔将获得计算机数据存储市场最大的厂商之一，更有效地与思科和IBM等同业竞争。</p><p>3.为什么不是其他公司收购EMC？EMC是第一批为全新的计算机市场生产存储设备的公司之一，其错过了云计算的早期发展势头，传统储存设备业务逐渐式微，增长缓慢，面临亚马逊、谷歌等这类大型云计算公司的竞争压力，全资控股子公司VMware业务也一直在下滑。1）戴尔和EMC的产品线冲突不大，互补性强，而像惠普与EMC的产品重合度太多。2）戴尔已经完成了私有化，可让EMC远离功利投资的烦恼；3）戴尔的迈克尔是EMC理想的接班人：年轻、市场地位高、迈克尔是戴尔的创始人和拥有者，会用心经营新公司；4）戴尔的出价还不错，且有能力筹措到所需要的资金。综上，戴尔是EMC最合适的收购者。</p><p>总结：这一场收购是戴尔和EMC双赢的结果。</p>",
                    "voteCount": 1,
                    "id": 1,
                    "type": 11,
                    "comment":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 2,
                    "type": 11,
                    "priority":0,
                    "comment":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 3,
                    "type": 11,
                    "priority":0,
                    "comment":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 4,
                    "type": 11,
                    "comment":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 5,
                    "type": 11,
                    "comment":0,
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 6,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学？",
                    "voteCount": 1,
                    "id": 7,
                    "type": 11
                },
                {
                    "title": null,
                    "upName": "Pat",
                    "upTime": "2017年01月16日",
                    "headPic": "http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay5KhpQIRIpY7DYXTlcKMicsq47nNJOC9PJu3VFIvUZUn410lK377dOFpG8rWiaoJQia6vpIP3zyVuEV/0",
                    "content": "1 为什么以前没有家长选择在孩子中学阶段就把他们送到美国留学？\n  答：以前家庭经济条件限制，现在越来越多的家庭经济条件很好。\n2 为什么现在越来越多家长选择在孩子中学阶段就不让其继续在国内读书？\n  答：国内教育模式，教育资源都相对较差。\n3 为什么现在越来越多家长不选择在孩子小学阶段或者大学阶段把他们送到美国留学 ",
                    "voteCount": 1,
                    "id": 8,
                    "type": 11
                },
            ]
        }), Math.random() * 1500)
});


router.get("/pc/operation/homework/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": [
                {
                    "id": 1,
                    "description": "balbal",
                    "pic": "http://www.iquanwai.com/images/cintro1.png",
                    "knowledgeId": 1,
                    "sceneId": 1,
                    "difficulty": null,
                    "content": "评论评论", //提交内容
                    "submitId": 1, //提交id
                    "submitUpdateTime": "2017-02-15" ,//最后提交时间
                    "voteCount": 0,
                    "commentCount": 0,
                    "voteStatus": 0,
                    "topic":"用分层归类法表达你的观点",
                }
            ],
            "code": 200
        });
    }, Math.random() * 1500);
});

router.post("/pc/admin/refund", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": "ok",
      "code": 200
    });
  }, Math.random() * 1500);
});

router.get("/pc/admin/config/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": [
                {
                    "key":"static.resource.url",
                    "value":"http://frag.confucius.mobi/bundle.js?",
                    "projectId":"rise",
                    "edit":false,
                    "display":true,
                },
                {
                    "key":"app.domainname",
                    "value":".confucius.mobi",
                    "projectId":"rise",
                    "edit":false,
                    "display":true,
                },
            ],
            "code": 200
        });
    }, Math.random() * 1500);
});


router.post("/pc/admin/config/add", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": "ok",
            "code": 200
        });
    }, Math.random() * 1500);
});

router.post("/pc/admin/config/update", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": "ok",
            "code": 200
        });
    }, Math.random() * 1500);
});

router.post("/pc/admin/config/delete", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "msg": "ok",
            "code": 200
        });
    }, Math.random() * 1500);
});


router.get("/pc/operation/problem/list", (req, res) => {
    setTimeout(() => {
        res.status(200).json({"msg":[{"name":"沟通人际","problems":[{"id":1,"problem":"与人沟通时条理更清晰","status":null},{"id":2,"problem":"跟老板/家人提要求时更有说服力","status":null},{"id":5,"problem":"与人撕逼时找到对方逻辑漏洞","status":null}]},{"name":"思维方法","problems":[{"id":3,"problem":"面对前所未有的新问题时撬开脑洞","status":null},{"id":4,"problem":"临场发言也能掷地有声","status":null},{"id":9,"problem":"找到本质问题，减少无效努力","status":null},{"id":10,"problem":"普通人的第一堂营销课","status":null},{"id":11,"problem":"洞察他人行为背后的真相","status":null},{"id":12,"problem":"面对热点事件保持独立思考","status":null}]},{"name":"职业发展","problems":[{"id":6,"problem":"写出令HR过目难忘的简历","status":null},{"id":7,"problem":"在面试中脱颖而出","status":null},{"id":8,"problem":"给自己的未来定个发展策略","status":null}]}],"code":200});
    }, Math.random() * 1500);
});

router.post("/pc/operation/warmup/save", (req, res) => {
    setTimeout(() => {
        res.status(200).json(
            {
              "msg":"ok",
              "code":200
            }
        );
    }, Math.random() * 1500);
});

router.get("/pc/operation/warmup/next/*", (req, res) => {
    setTimeout(() => {
        res.status(200).json(
            {
                "code": 200,
                "msg": {
                    "id": 1, //题目id
                    "question": "题干", //问题题干
                    "analysis": "balbal", //问题分析
                    "voice": "http://someurl", //语音分析链接
                    "type": 1, //1-单选题，2-多选题
                    "Difficulty": 1, //1-简单，2-普通，3-困难
                    "problemId":1,
                    "choiceList": [
                        {
                            "id": 1,
                            "questionId": 1, //问题id
                            "subject": "选项1", //选项题干
                            "sequence": 1, //选项顺序
                            "isRight": false,  //是否是正确选项
                        },
                        {
                            "id": 2,
                            "questionId": 1,
                            "subject": "选项2",
                            "sequence": 2,
                            "isRight": true,
                        },
                        {
                            "id": 3,
                            "questionId": 1,
                            "subject": "选项2",
                            "sequence": 2,
                            "isRight": true,
                        },
                        {
                            "id": 4,
                            "questionId": 1,
                            "subject": "选项2",
                            "sequence": 2,
                            "isRight": false,
                        }
                    ]
                }
            });
    }, Math.random() * 1500);
});

router.get("/pc/operation/problem/simple", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      {
        "msg": [
          {
            "id": 1,
            "problem": "与人沟通时条理更清晰"
          },
          {
            "id": 3,
            "problem": "面对前所未有的新问题时撬开脑洞"
          },
          {
            "id": 5,
            "problem": "与人撕逼时找到对方逻辑漏洞"
          },
          {
            "id": 6,
            "problem": "写出令HR过目难忘的简历"
          },
          {
            "id": 7,
            "problem": "在面试中脱颖而出"
          },
          {
            "id": 8,
            "problem": "给自己的未来定个发展策略"
          },
          {
            "id": 9,
            "problem": "找到本质问题，减少无效努力"
          },
          {
            "id": 10,
            "problem": "普通人的第一堂营销课"
          },
          {
            "id": 11,
            "problem": "洞察他人行为背后的真相"
          },
          {
            "id": 12,
            "problem": "面对热点事件保持独立思考"
          },
          {
            "id": 13,
            "problem": "演讲也是力量"
          },
          {
            "id": 14,
            "problem": "如何用故事说服别人"
          },
          {
            "id": 15,
            "problem": "如何改变自己"
          },
          {
            "id": 16,
            "problem": "影响力：让他人不再对我们说不"
          },
          {
            "id": 17,
            "problem": "如何打造自己专属的时间管理系统"
          },
          {
            "id": 18,
            "problem": "别让情绪打败你"
          },
          {
            "id": 19,
            "problem": "如何结识比自己牛的人"
          },
          {
            "id": 20,
            "problem": "认识自己：让你的人生不再迷茫"
          },
          {
            "id": 21,
            "problem": "双赢谈判：不撕逼也能得到你想要的"
          },
          {
            "id": 22,
            "problem": "聊天有术：不再把天聊死"
          },
          {
            "id": 23,
            "problem": "如何高效学习"
          },
          {
            "id": 24,
            "problem": "如何高效工作"
          }
        ],
        "code": 200
      }
    );
  }, Math.random() * 1500);
});

router.get("/pc/operation/problem/load/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      {
        "msg": {
          "id": 1,
          "problem": "与人沟通时条理更清晰",
          "length": 9,
          "catalogId": 1,
          "subCatalogId": 1,
          "author": "孙圈圈",
          "authorPic": "https://static.iqycamp.com/images/rise_problem_author_pic_sunquanquanV2.png?imageslim",
          "difficultyScore": 3.2542,
          "usefulScore": 4.0716,
          "descPic": "https://static.iqycamp.com/images/problem_desc_1_2.jpeg",
          "audioId": 169,
          "who": "希望提升沟通表达条理性的人",
          "how": "如果做到以下4点，你的沟通就能更有条理，更容易被理解。\n\n1、先抛主题\n2、将同类信息/内容归在一组\n3、确保信息/内容归类不重叠不遗漏\n4、按逻辑顺序组织每组信息/内容",
          "why": "为什么有些人即兴发言也能侃侃而谈，而有些人一开口却大脑一片空白？为什么有些人写的报告思路特别清晰，令人读后印象深刻，而有的人的报告却让人不知所云？\n\n通过学习这门小课，了解大脑的理解和记忆习惯，按套路出牌，你也可以做到沟通更清晰有力，也更容易被他人理解。",
          "del": false,
          "trial": false,
          "abbreviation": "清晰沟通",
          "schedules": [
            {
              "id": 1,
              "problemId": 1,
              "section": 1,
              "knowledgeId": 1,
              "chapter": 1,
              "series": 1,
              "knowledges": null
            },
            {
              "id": 2,
              "problemId": 1,
              "section": 2,
              "knowledgeId": 6,
              "chapter": 1,
              "series": 2,
              "knowledges": null
            },
            {
              "id": 3,
              "problemId": 1,
              "section": 1,
              "knowledgeId": 2,
              "chapter": 2,
              "series": 3,
              "knowledges": null
            },
            {
              "id": 4,
              "problemId": 1,
              "section": 2,
              "knowledgeId": 3,
              "chapter": 2,
              "series": 4,
              "knowledges": null
            },
            {
              "id": 5,
              "problemId": 1,
              "section": 3,
              "knowledgeId": 4,
              "chapter": 2,
              "series": 5,
              "knowledges": null
            },
            {
              "id": 6,
              "problemId": 1,
              "section": 4,
              "knowledgeId": 5,
              "chapter": 2,
              "series": 6,
              "knowledges": null
            },
            {
              "id": 7,
              "problemId": 1,
              "section": 1,
              "knowledgeId": 7,
              "chapter": 3,
              "series": 7,
              "knowledges": null
            },
            {
              "id": 8,
              "problemId": 1,
              "section": 1,
              "knowledgeId": 57,
              "chapter": 4,
              "series": 8,
              "knowledges": null
            },
            {
              "id": 9,
              "problemId": 1,
              "section": 2,
              "knowledgeId": 58,
              "chapter": 4,
              "series": 9,
              "knowledges": null
            }
          ]
        },
        "code": 200
      }
    );
  }, Math.random() * 1500);
});

router.get("/pc/operation/problem/catalog/load", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      {
        "msg": {
          "catalogs": [
            {
              "id": 1,
              "name": "打造自己",
              "pic": "https://www.iqycamp.com/images/problemCatalogGTRJ.png",
              "color": "#4aa8aa"
            },
            {
              "id": 2,
              "name": "营销自己",
              "pic": "https://www.iqycamp.com/images/problemCatalogSWFF.png",
              "color": "#667bc7"
            },
            {
              "id": 3,
              "name": "定位自己",
              "pic": "https://www.iqycamp.com/images/problemCatalogZYFZ.png",
              "color": "#4d86c2"
            },
            {
              "id": 4,
              "name": "管理自己",
              "pic": null,
              "color": "#eeeeee"
            },
            {
              "id": 5,
              "name": "通用知识",
              "pic": null,
              "color": null
            },
            {
              "id": 6,
              "name": "超越自己",
              "pic": null,
              "color": null
            }
          ],
          "subCatalogs": [
            {
              "id": 1,
              "name": "表达能力"
            },
            {
              "id": 2,
              "name": "创新能力"
            },
            {
              "id": 3,
              "name": "思考能力"
            },
            {
              "id": 4,
              "name": "求职能力"
            },
            {
              "id": 5,
              "name": "个人规划"
            },
            {
              "id": 6,
              "name": "影响力"
            },
            {
              "id": 7,
              "name": "行为管理"
            },
            {
              "id": 8,
              "name": "效率管理"
            },
            {
              "id": 9,
              "name": "情绪管理"
            },
            {
              "id": 10,
              "name": "人际网络"
            },
            {
              "id": 15,
              "name": "自我认知"
            },
            {
              "id": 16,
              "name": "天赋开发"
            },
            {
              "id": 17,
              "name": "职业定位"
            },
            {
              "id": 18,
              "name": "学习能力"
            },
            {
              "id": 19,
              "name": "向上管理"
            },
            {
              "id": 20,
              "name": "个人品牌"
            },
            {
              "id": 21,
              "name": "战略制定"
            },
            {
              "id": 22,
              "name": "决策制定"
            },
            {
              "id": 23,
              "name": "团队管理"
            },
            {
              "id": 24,
              "name": "人才管理"
            },
            {
              "id": 25,
              "name": "通用知识"
            }
          ]
        },
        "code": 200
      }
    );
  }, Math.random() * 1500);
});

router.get("/pc/operation/knowledge/simple/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      {"msg":[{"id":44,"knowledge":"澄清问题的理解偏差"},{"id":45,"knowledge":"澄清背后的隐藏偏差"},{"id":46,"knowledge":"用5个为什么找原因"},{"id":47,"knowledge":"用矩阵确定关键-可行"}],"code":200}
    );
  }, Math.random() * 1500);
});

router.get("/pc/operation/knowledge/get/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      {"msg":{"id":15,"knowledge":"用SCAMPER结构化头脑风暴","step":"结构化思考","analysis":"SCAMPER（由七个英文单词或短语的首字母构成）是一种用于头脑风暴的问题清单，它为普通的头脑风暴提供了更为结构化的指导。通常适用于改进某个产品或服务的情景。","means":"在改进产品或服务时，用以下七个问题一一发问，拓展思路：\nSubstitute（代替）：成分、材料、人员是否有可替代方案，乃至对旧产品、旧服务可以进行替代吗？\nCombine（合并）：资源、品类、功能等是否存在合并的可能？\nAdapt（适应）：产品或服务能适应哪些其他场景？\nModify（修改）：产品的颜色、形状等特征可以作何修改？\nPut to other uses（作为他用）：产品或服务还有哪些新用途吗？\nEliminate（简化）：产品或服务可以做哪些简化？\nReverse（rearrange）（反向、重新安排）：产品或服务可以怎样逆向操作、重新安排？\n","keynote":"SCAMPER问题清单可以使你打开思路、拓展想法，但并非每个问题的答案都适合需要\n","analysisPic":null,"meansPic":null,"keynotePic":null,"pic":null,"audio":null,"analysisAudio":null,"meansAudio":null,"keynoteAudio":null,"appear":null,"chapter":2,"section":1},"code":200}
    );
  }, Math.random() * 1500);
});

router.get("/pc/operation/knowledge/update/knowledge/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

module.exports = router;

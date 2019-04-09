var myData = [];
var pie = document.getElementById("container_p");
var myPie = echarts.init(pie);
var app = {};
Poption = null;
Poption = {
    title: {
        text: '有效记录',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b} : {c}场 ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: '记录',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '4圈'},
                {value: 310, name: '7圈'},
                {value: 234, name: '500米'},
                {value: 135, name: '1000米'},
                {value: 1548, name: '1500米'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
if (Poption && typeof Poption === "object") {
    myPie.setOption(Poption, true);
    myPie.on('click', function (p) {
        console.log(p);
    });
}

var line = document.getElementById("container_l");
var myLine = echarts.init(line);
var app = {};
Loption = null;
Loption = {
    yAxis: {
        type: 'time',
        name: '记录',
        splitLine: {
            show: true
        },
        inverse: true,
    },
    xAxis: {
        type: 'category',
        axisLabel: "",
        name: '比赛',
        data: ["a", "b", "c", "d", "e", "f", "g"],
        splitLine: {
            show: true
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (p) {
            return p[0]['axisValue'] + "</br>" + p[0]['value'].replace("0000-00-00 00:", "")
        },
        axisPointer: {
            type: 'cross',
            label: {
                precision: 2,
                backgroundColor: '#6a7985'
            },

        }
    },
    series: [{
        data: [
            "0000-00-00 00:01:47.698",
            "0000-00-00 00:01:47.796",
            "0000-00-00 00:01:47.796",
            "0000-00-00 00:01:48.078",
            "0000-00-00 00:01:50.695",
            "0000-00-00 00:01:50.888",
        ],

        type: 'line',

    }]
};
if (Loption && typeof Loption === "object") {
    myLine.setOption(Loption, true);
}

jQuery.Huitab = function (tabBar, tabCon, class_name, tabEvent, i) {
    var $tab_menu = $(tabBar);
    // 初始化操作
    $tab_menu.removeClass(class_name);
    $(tabBar).eq(i).addClass(class_name);
    $(tabCon).hide();
    $(tabCon).eq(i).show();

    $tab_menu.bind(tabEvent, function () {
        $tab_menu.removeClass(class_name);
        $(this).addClass(class_name);
        var index = $tab_menu.index(this);
        $(tabCon).hide();
        $(tabCon).eq(index).show()
    })
};

$(function () {
    $.Huitab("#tab_demo .tabBar span", "#tab_demo .tabCon", "current", "click", "0")
});


HiAlert = function (string, time = 2000) {
    $.Huimodalalert(string, time)
};
// #tab_demo 父级id
// #tab_demo .tabBar span 控制条
// #tab_demo .tabCon 内容区
// click 事件 点击切换，可以换成mousemove 移动鼠标切换
// 1	默认第2个tab为当前状态（从0开始）

function getPlayerScore() {
    let id = cookie.get("player_id");
    $.ajax({
        url: "http://api.fsh.ink/v1/player/getPlayerScore/" + id,
        method: "GET",
        dataType: "json",
        data: {
            id: id,
            token: cookie.get("player_token"),
        },
        success: function (evt, req, settings) {
            let html = "";
            if (req === "success") {
                if (evt['message'] === "fail") {
                    token_timeout();
                }
                for (let i = 0; i < evt['data'].length; i++) {
                    html += "<tr>\n" +
                        "        <td>" + evt['data'][i]['match_name'] + "</td>\n" +
                        "        <td>" + evt['data'][i]['group_type'] + "</td>\n" +
                        "        <td>" + evt['data'][i]['gender'] + "</td>\n" +
                        "        <td>" + evt['data'][i]['match_type'] + "</td>\n" +
                        "        <td>" + evt['data'][i]['s_group'] + "</td>\n" +
                        "        <td>" + evt['data'][i]['no'] + "</td>\n" +
                        "        <td>" + evt['data'][i]['time_score'] + "</td>\n" +
                        "    </tr>\n";
                }
                if (evt['data'].length === 0) {
                    html += "        <tr><td colspan='8' style='text-align: center'>暂无数据</td></tr>\n"
                }
                $("#myScore").append(html);
                $("#organize_name").html(evt['data'][0]['organize']);
                $("#player_name").html(evt['data'][0]['name']);
            } else {
                HiAlert("ajax fail")
            }
        }
    })
}

function getPlayerBestScore() {
    let id = cookie.get("player_id");
    $.ajax({
        url: "http://api.fsh.ink/v1/player/getPlayerBestScore/" + id,
        method: "GET",
        dataType: "json",
        data: {
            id: id,
            token: cookie.get("player_token"),
        },
        success: function (evt, req, settings) {
            if (evt['message'] === "fail") {
                token_timeout();
            }
            let matchName = ["500米", "1000米", "1500米", "4圈", "7圈"];
            let html = "";
            if (req === "success") {
                for (let i = 0; i < 5; i++) {
                    if (evt[i] !== "filter") {
                        html += "<tr>\n" +
                            "        <td>" + evt[i]['match_name'] + "</td>\n" +
                            "        <td>" + evt[i]['group_type'] + "</td>\n" +
                            "        <td>" + evt[i]['gender'] + "</td>\n" +
                            "        <td>" + evt[i]['match_type'] + "</td>\n" +
                            "        <td>" + evt[i]['s_group'] + "</td>\n" +
                            "        <td>" + evt[i]['no'] + "</td>\n" +
                            "        <td>" + evt[i]['time_score'] + "</td>\n" +
                            "    </tr>\n";
                    } else {
                        html += "<tr><td>" + matchName[i] + "</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>"
                    }
                }
                $("#myBestScore").append(html)
            } else {
                HiAlert("ajax fail")
            }
        }
    })

}

checkCookie();
getPlayerScore();
getPlayerBestScore();
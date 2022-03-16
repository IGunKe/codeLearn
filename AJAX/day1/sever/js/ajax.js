function ajax(options) {
  // 设置默认选项
  var defaults = {
    type: "get",
    url: "",
    data: "",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    success: function () {},
    error: function () {},
  };
  // 该方法覆盖defaults属性
  Object.assign(defaults, options);

  // 创建ajax对象
  var xhr = new XMLHttpRequest();
  // json转字符串
  let params = "";

  for (var attr in defaults.data) {
    params += attr + "=" + defaults.data[attr] + "&";
  }
  // 去除最后的&
  params = params.substr(0, params.length - 1);

  if (defaults.type == "get") {
    defaults.url = defaults.url + "?" + params;
  }
  // 请求地址
  xhr.open(defaults.type, defaults.url);
  // 请求发送
  if (defaults.type == "post") {
    // 判断是否需要转换传递格式
    var contentType = defaults.header["Content-Type"];
    xhr.setRequestHeader("Content-Type", contentType);
    if (contentType == "application/json") {
      xhr.send(JSON.stringify(defaults.data));
    } else {
      xhr.send(params);
    }
  } else {
    xhr.send();
  }

  // 响应接受
  xhr.onload = function () {
    var contentType = xhr.getResponseHeader("Content-Type");

    var responseText = xhr.responseText;
    // includes()是字符串方法，用来判断是否包含
    if (contentType.includes("application/json")) {
      responseText = JSON.parse(responseText);
    }
    if (xhr.status == 200) {
      // 请求成功时调用success函数
      defaults.success(responseText, xhr);
    } else {
      defaults.error(responseText, xhr);
    }
  };
}

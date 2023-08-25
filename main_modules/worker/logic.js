// WebWorker的业务逻辑处理, 在初始化WebWorker实例时将该文件路径传入进去即可。

// 监听主线程消息
self.addEventListener('message', (event) => {
  const data = event.data;

  // 在这里进行耗时操作或其他需要在 Worker 中处理的任务

  // 处理完后发送消息给主线程
  self.postMessage(data);
});
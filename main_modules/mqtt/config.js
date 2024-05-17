// MQTT 配置信息
export const MQTT_CONFIG = {
  IP: '192.xxx.x.xxx:8083/mqtt', // MQTT服务器地址和端口
  USERNAME: '', // MQTT用户名
  PASSWORD: '', // MQTT密码
  OPTIONS: {
    connectTimeout: 5000,
    clientId: '',
    username: '', // 将在MQTT服务中动态设置
    password: '', // 将在MQTT服务中动态设置
    clean: true
  },
  TOPIC: 'testtopic/' // 默认订阅的主题
};

// 使用示例
// <script>
// import mqttService from '@/path/to/mqttService.js';

// export default {
//   methods: {
//     connectMQTT() {
//       mqttService.connect();
//     },
//     publishMessage() {
//       mqttService.publish("Hello World");
//     },
//     subscribeTopic() {
//       mqttService.subscribe();
//     },
//     unsubscribeTopic() {
//       mqttService.unsubscribe();
//     },
//     disconnectMQTT() {
//       mqttService.disconnect();
//     }
//   }
// }
// </script>
export default {
  install: (app) => {
    app.config.globalProperties.$log = (data) => {
      console.log(data);
    };
  },
};

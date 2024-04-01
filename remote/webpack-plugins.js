const DateSeparatorPlugin = new (function () {
  this.apply = (compiler) => {
    compiler.hooks.done.tap("Log On Done Plugin", () => {
      console.log(
        "\n======================== [" +
          new Date().toLocaleString() +
          "]" +
          " Begin a new compilation. ========================\n ",
      );
    });
  };
})();

module.exports = {
    DateSeparatorPlugin
}
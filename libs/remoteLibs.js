// how to get all the remote libs and such
//https://code.google.com/p/selenium/wiki/SafariDriver
module.exports = {
        selenium: {
          url: 'https://selenium-release.storage.googleapis.com/3.8/selenium-server-standalone-3.8.1.jar'
        , file: 'selenium-server-standalone-3.8.1.jar'
        , sha: '0ce8768f48a053d55ae52dda7f09e9c7a9c73d7a'}
      , platform: {
        linux_x64: [
            { name: 'chrome'
            , url: 'https://chromedriver.storage.googleapis.com/2.35/chromedriver_linux64.zip'
            , file: 'chromedriver_linux64'
            , sha: '1f394adc5552f74248f6e5654d66f57a05d6b759'}
          ,  { name: 'gecko'
            , url: 'https://github.com/mozilla/geckodriver/releases/download/v0.19.0/geckodriver-v0.19.0-linux64.tar.gz'
            , file: 'geckodriver-v0.19.0_linux64'
            , sha: '64decacff2095a1974958f7c15d611d6f064c1f5'}
          ]
        , darwin: [
            { name: 'chrome'
            , url: 'https://chromedriver.storage.googleapis.com/2.35/chromedriver_mac64.zip'
            , file: 'chromedriver_mac64.zip'
            , sha: 'e06275dc8a04f004d701109111d33903d566b157'}
          ,  { name: 'gecko'
            , url: 'https://github.com/mozilla/geckodriver/releases/download/v0.19.0/geckodriver-v0.19.0-macos.tar.gz'
            , file: 'geckodriver-v0.19.0'
            , sha: '3788704e86885205b8b58ba9f2c56a75a971e3ac'}
          ]
        , win32: [
            { name: 'chrome'
            , url: 'https://chromedriver.storage.googleapis.com/2.35/chromedriver_win32.zip'
            , file: 'chromedriver_win32.exe'
            , sha: 'df07745602f4a22ff364a4ffb610be9d067d487d'}
          , { name: 'ie'
            , url: 'https://selenium-release.storage.googleapis.com/3.0/IEDriverServer_Win32_3.0.0.zip'
            , file: 'IEDriverServer_Win32_3.0.0.exe'
            , sha: 'bb400c8e5efb09c85a6b6f555abb5b66322d8081'}
          ,  { name: 'gecko'
            , url: 'https://github.com/mozilla/geckodriver/releases/download/v0.19.0/geckodriver-v0.19.0-win32.zip'
            , file: 'geckodriver-v0.19.0-win32.zip'
            , sha: 'b4366f8438f975fbed470e99e3b663a9e4d339b0'}
          ]}
      , listHash: function() {
          // just a way to download everything and output the sha to update versions and such
          // in a simple node REPL
          // require('./remoteLibs.js').listHash()
          var to_get = []
          for (p in module.exports.platform) {
            to_get = to_get.concat(module.exports.platform[p])
          }
          to_get.push(module.exports.selenium)

          var async = require('async')
          async
            .each(to_get
                , require('./download.js')
                , function(e) {
                    if (e) {
                      console.log(e)
                    }
                    async
                      .each(to_get
                          , function(op, cb) {
                              require('hash_file')(op.file, 'sha1', function(er, sha) {
                                if (er) return cb(er)
                                  console.log([op.file, sha])
                                  cb()
                                })
                          })
                })
      }}
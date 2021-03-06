(function () {
  'use strict';
  let ub = µBlock;

  vAPI.messaging.listen('checkUrlClass', function (request, sender, callback) {
    vAPI.tabs.get(request.tabId, function (tab) {
      callback(ub.getDomainAdsClass(tab.url));
    });
  });

  vAPI.messaging.listen('saveData', function (request, sender, callback) {
    vAPI.storage.set(request);
    callback();
  });

  vAPI.messaging.listen('saveAdsClass', function (request, sender, callback) {
    vAPI.storage.set(request);
    ub.adsClass = request.adsClass;
    callback();
  });

  vAPI.messaging.listen('getData', function(request, sender, callback) {
    vAPI.storage.get(request.key, function (data) {
      callback(data);
    });
  });

  vAPI.messaging.listen('checkDomainClass', function(request, sender, callback) {
    ub.getAndCacheDomainClass(request.url).then(callback);
  });
})();
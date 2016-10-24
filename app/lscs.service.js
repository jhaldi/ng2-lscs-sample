"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('./rxjs-extensions');
var Observable_1 = require('rxjs/Observable');
var LSCSBanner = (function () {
    function LSCSBanner(banner_caption, banner_image) {
        this.banner_caption = banner_caption;
        this.banner_image = banner_image;
    }
    return LSCSBanner;
}());
exports.LSCSBanner = LSCSBanner;
var LSCSPromo = (function () {
    function LSCSPromo(promo_title, promo_description) {
        this.promo_title = promo_title;
        this.promo_description = promo_description;
    }
    return LSCSPromo;
}());
exports.LSCSPromo = LSCSPromo;
var LSCSService = (function () {
    function LSCSService(http) {
        this.http = http;
        //URLs to web api
        this.corsProxy = 'proxy/corsproxy.php?url=';
        this.lscsServer = '';
        this.projectName = '';
        this.targetServer = 'azure';
        this.bannerPath = '/document/path/templatedata/LiveSite/Banner/data/';
        this.promoPath = '/document/path/templatedata/LiveSite/Promo/data/';
        switch (this.targetServer) {
            case 'ew2016':
                this.lscsServer = 'http://ew2016.teamsite8demo.com:1876/lscs/v1';
                this.projectName = 'project=//ip-172-30-0-41.ec2.internal/default/main/AuraBank';
                break;
            default:
                this.lscsServer = 'http://pocteamsite02.eastus.cloudapp.azure.com:1876/lscs/v1';
                this.projectName = 'project=//pocteamsite02/default/main/AuraBank';
                break;
        }
    }
    LSCSService.prototype.getPromoViaObservable = function (promoName) {
        var fetchUrl = this.corsProxy + this.lscsServer + this.promoPath
            + promoName + '?' + this.projectName;
        console.log('Fetching Promo from ' + fetchUrl);
        return this.http.get(fetchUrl)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    };
    LSCSService.prototype.getBannerViaObservable = function (bannerName) {
        var fetchUrl = this.corsProxy + this.lscsServer + this.bannerPath
            + bannerName + '?' + this.projectName;
        console.log('Fetching Banner from ' + fetchUrl);
        return this.http.get(fetchUrl)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    };
    LSCSService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    LSCSService.prototype.handleErrorObservable = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error("Error from Observable" + errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    LSCSService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LSCSService);
    return LSCSService;
}());
exports.LSCSService = LSCSService;
//# sourceMappingURL=lscs.service.js.map
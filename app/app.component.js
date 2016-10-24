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
var lscs_service_1 = require('./lscs.service');
var AppComponent = (function () {
    function AppComponent(lscsService) {
        this.lscsService = lscsService;
        this.targetServer = 'azure';
        this.lscsServer = '';
        this.projectName = '';
        this.displayButtons = false;
    }
    AppComponent.prototype.ngOnInit = function () {
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
        this.persona = "adult";
        this.geo = "usa";
        this.setTargets();
    };
    AppComponent.prototype.getPromo = function (fileName) {
        var _this = this;
        this.lscsService.getPromoViaObservable(fileName)
            .subscribe(function (response) { return _this.promo = response; }, function (error) { return console.error("Error in getPromo: " + error); });
    };
    AppComponent.prototype.getBanner = function (fileName) {
        var _this = this;
        this.lscsService.getBannerViaObservable(fileName)
            .subscribe(function (response) {
            _this.banner = response;
            _this.bannerImageUrl = _this.lscsServer + '/document/path'
                + _this.banner.banner_image + '?' + _this.projectName;
        }, function (error) { return console.error("Error in getBanner: " + error); });
    };
    AppComponent.prototype.toggleButtons = function () {
        if (this.displayButtons == true) {
            this.displayButtons = false;
        }
        else {
            this.displayButtons = true;
        }
    };
    AppComponent.prototype.personaClicked = function (param) {
        this.persona = param;
        this.setTargets();
    };
    AppComponent.prototype.geoClicked = function (param) {
        this.geo = param;
        this.setTargets();
    };
    AppComponent.prototype.setTargets = function () {
        switch (this.persona) {
            case 'student':
                this.promoFileName = 'banktoschoolspecial.xml';
                switch (this.geo) {
                    case 'west':
                        this.bannerFileName = 'techgeneration.xml';
                        break;
                    case 'east':
                        this.bannerFileName = 'BankThatMovesQuickly.xml';
                        break;
                    default:
                        this.bannerFileName = 'BankingForInternet.xml';
                }
                break;
            case 'senior':
                this.promoFileName = 'highinterestsavingsaccounts.xml';
                switch (this.geo) {
                    case 'west':
                        this.bannerFileName = 'LikeNoOther.xml';
                        break;
                    case 'east':
                        this.bannerFileName = 'BankThatUnderstands.xml';
                        break;
                    default:
                        this.bannerFileName = 'BankingForInternet.xml';
                }
                break;
            default:
                this.promoFileName = 'nofeeira.xml';
                switch (this.geo) {
                    case 'west':
                        this.bannerFileName = 'hometownbank.xml';
                        break;
                    case 'east':
                        this.bannerFileName = 'NewPlayerInTown.xml';
                        break;
                    default:
                        this.bannerFileName = 'BankingForInternet.xml';
                }
                break;
        }
        this.getBanner(this.bannerFileName);
        this.getPromo(this.promoFileName);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['./app.component.css']
        }), 
        __metadata('design:paramtypes', [lscs_service_1.LSCSService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
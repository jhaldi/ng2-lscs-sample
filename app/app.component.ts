import {Component, OnInit} from '@angular/core';
import {LSCSService, LSCSBanner, LSCSPromo} from './lscs.service';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(private lscsService: LSCSService) {
    }

    private targetServer: string = 'azure';

    private lscsServer = '';
    private projectName = '';

    displayButtons: boolean = false;

    banner: LSCSBanner;
    bannerFileName: string;
    bannerImageUrl: string;

    promo: LSCSPromo;
    promoFileName: string;

    persona: string;
    geo: string;

    ngOnInit(): void {

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
    }

    getPromo(fileName: string) {
        this.lscsService.getPromoViaObservable(fileName)
            .subscribe(
                response => this.promo = response,
                error=> console.error("Error in getPromo: " + error)
            );
    }

    getBanner(fileName: string) {
        this.lscsService.getBannerViaObservable(fileName)
            .subscribe(
                response => {
                    this.banner = response;
                    this.bannerImageUrl = this.lscsServer + '/document/path'
                        + this.banner.banner_image + '?' + this.projectName;
                },
                error=> console.error("Error in getBanner: " + error)
            );
    }

    toggleButtons() {
        if (this.displayButtons == true) {
            this.displayButtons = false
        } else {
            this.displayButtons = true
        }

    }

    personaClicked(param: string) {
        this.persona = param;
        this.setTargets();
    }

    geoClicked(param: string) {
        this.geo = param;
        this.setTargets();
    }

    setTargets() {

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
    }
}

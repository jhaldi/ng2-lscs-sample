import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import './rxjs-extensions';
import {Observable} from 'rxjs/Observable';

export class LSCSBanner {
    constructor(public banner_caption: string,
                public banner_image: string) {
    }
}

export class LSCSPromo {
    constructor(public promo_title: string,
                public promo_description: string) {
    }
}

@Injectable()
export class LSCSService {

    //URLs to web api
    private corsProxy = 'proxy/corsproxy.php?url=';
    private lscsServer = '';
    private projectName = '';

    private targetServer = 'azure';

    private bannerPath = '/document/path/templatedata/LiveSite/Banner/data/';
    private promoPath = '/document/path/templatedata/LiveSite/Promo/data/';

    constructor(private http: Http) {
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

    getPromoViaObservable(promoName: string): Observable<LSCSPromo> {
        let fetchUrl = this.corsProxy + this.lscsServer + this.promoPath
            + promoName + '?' + this.projectName;
        console.log('Fetching Promo from ' + fetchUrl);
        return this.http.get(fetchUrl)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    getBannerViaObservable(bannerName: string): Observable<LSCSBanner> {
        let fetchUrl = this.corsProxy + this.lscsServer + this.bannerPath
            + bannerName + '?' + this.projectName;
        console.log('Fetching Banner from ' + fetchUrl);
        return this.http.get(fetchUrl)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleErrorObservable(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error("Error from Observable" + errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}



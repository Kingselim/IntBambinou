import { Component, OnInit, AfterViewInit } from '@angular/core';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js'; 
import { UserServiceService } from '../../service/user-service.service';
import { User } from '../../model/User';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',"../../../assets/BackOffice/assets/css/bootstrap.min.css",
    "../../../assets/BackOffice/assets/css/demo.css",
    "../../../assets/BackOffice/assets/css/fonts.css",
    "../../../assets/BackOffice/assets/css/fonts.min.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.min.css"]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  listUser: User[] = []; 
  countryUserCount: { [key: string]: number } = {};
  UserCount: number = 0;

  constructor(private userService: UserServiceService,private route: ActivatedRoute,private authService: AuthService) { }

  ngOnInit() {
    this.userService.getUser().subscribe((data) => {
      this.listUser = data;
      this.countUsersByCountry();
      this.loadMap();
      this.countUsers();
    });
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.saveToken(token);
      }
    });
  }



  ngAfterViewInit(): void {
    // La carte sera chargée après l'initialisation
  }

  // 🏳️ Convertir un nom de pays en code ISO
  getCountryCode(countryName: string): string {
    const countryMap: { [key: string]: string } = {
      "France": "FR", "Germany": "DE", "Spain": "ES", "Italy": "IT", "United Kingdom": "GB",
      "Belgium": "BE", "Switzerland": "CH", "Netherlands": "NL", "Portugal": "PT", "Sweden": "SE",
      "Norway": "NO", "Finland": "FI", "Denmark": "DK", "Austria": "AT", "Poland": "PL",
      "Czech Republic": "CZ", "Hungary": "HU", "Greece": "GR", "Ireland": "IE", "Slovakia": "SK",
      "Slovenia": "SI", "Croatia": "HR", "Lithuania": "LT", "Estonia": "EE", "Latvia": "LV",
      "United States": "US", "Canada": "CA", "Mexico": "MX", "Brazil": "BR", "Argentina": "AR",
      "Colombia": "CO", "Chile": "CL", "Peru": "PE", "Ecuador": "EC", "Uruguay": "UY",
      "Paraguay": "PY", "Venezuela": "VE", "Bolivia": "BO", "Costa Rica": "CR", "Panama": "PA",
      "Cuba": "CU", "Dominican Republic": "DO", "El Salvador": "SV", "Honduras": "HN", "Nicaragua": "NI",
      "Tunisia": "TN", "Algeria": "DZ", "Morocco": "MA", "Libya": "LY", "Mauritania": "MR",
      "Egypt": "EG", "Saudi Arabia": "SA", "United Arab Emirates": "AE", "Qatar": "QA", "Kuwait": "KW",
      "Jordan": "JO", "Lebanon": "LB", "Iraq": "IQ", "Syria": "SY", "Oman": "OM",
      "Senegal": "SN", "Ivory Coast": "CI", "Mali": "ML", "Burkina Faso": "BF", "Niger": "NE",
      "Ghana": "GH", "Nigeria": "NG", "South Africa": "ZA", "Kenya": "KE", "Ethiopia": "ET",
      "Cameroon": "CM", "DRC": "CD", "Angola": "AO", "Tanzania": "TZ", "Uganda": "UG",
      "China": "CN", "India": "IN", "Japan": "JP", "South Korea": "KR", "Indonesia": "ID",
      "Malaysia": "MY", "Thailand": "TH", "Vietnam": "VN", "Philippines": "PH", "Pakistan": "PK"
    };
    return countryMap[countryName] || "N/A";
  }
  
  getCountryCoordinates(countryCode: string): [number, number] {
    const countryCoordinates: { [key: string]: [number, number] } = {
      FR: [46.603354, 1.888334], US: [37.09024, -95.712891], TN: [33.886917, 9.537499],
      IT: [41.87194, 12.56738], DE: [51.165691, 10.451526], ES: [40.463667, -3.74922],
      CA: [56.130366, -106.346771], MA: [31.7917, -7.0926], DZ: [28.0339, 1.6596], BR: [-14.235, -51.9253],
      GB: [55.3781, -3.4360], BE: [50.8503, 4.3517], CH: [46.8182, 8.2275], NL: [52.3676, 4.9041],
      PT: [39.3999, -8.2245], SE: [60.1282, 18.6435], NO: [60.4720, 8.4689], FI: [61.9241, 25.7482],
      DK: [56.2639, 9.5018], AT: [47.5162, 14.5501], PL: [51.9194, 19.1451], CZ: [49.8175, 15.4729],
      HU: [47.1625, 19.5033], GR: [39.0742, 21.8243], IE: [53.1424, -7.6921], SK: [48.6690, 19.6990],
      SI: [46.1512, 14.9955], HR: [45.1, 15.2], LT: [55.1694, 23.8813], EE: [58.5953, 25.0136],
      LV: [56.8796, 24.6032], MX: [23.6345, -102.5528], AR: [-38.4161, -63.6167], CO: [4.5709, -74.2973],
      CL: [-35.6751, -71.5430], PE: [-9.1899, -75.0152], EC: [-1.8312, -78.1834], UY: [-32.5228, -55.7658],
      PY: [-23.4425, -58.4438], VE: [6.4238, -66.5897], BO: [-16.2902, -63.5887], CR: [9.7489, -83.7534],
      PA: [8.5379, -80.7821], CU: [21.5218, -77.7812], DO: [18.7357, -70.1627], SV: [13.7942, -88.8965],
      HN: [15.1999, -86.2419], NI: [12.8654, -85.2072], LY: [26.3351, 17.2283], MR: [21.0079, -10.9408],
      EG: [26.8206, 30.8025], SA: [23.8859, 45.0792], AE: [23.4241, 53.8478], QA: [25.3548, 51.1839],
      KW: [29.3759, 47.9774], JO: [30.5852, 36.2384], LB: [33.8547, 35.8623], IQ: [33.2232, 43.6793],
      SY: [34.8021, 38.9968], OM: [21.4735, 55.9754], SN: [14.4974, -14.4524], CI: [7.5399, -5.5471],
      ML: [17.5707, -3.9962], BF: [12.2383, -1.5616], NE: [17.6078, 8.0817], GH: [7.9465, -1.0232],
      NG: [9.0820, 8.6753], ZA: [-30.5595, 22.9375], KE: [-1.286389, 36.817223], ET: [9.145, 40.4897],
      CM: [3.8480, 11.5021], CD: [-4.0383, 21.7587], AO: [-11.2027, 17.8739], TZ: [-6.3690, 34.8888],
      UG: [1.3733, 32.2903], CN: [35.8617, 104.1954], IN: [20.5937, 78.9629], JP: [36.2048, 138.2529],
      KR: [35.9078, 127.7669], ID: [-0.7893, 113.9213], MY: [4.2105, 101.9758], TH: [15.8700, 100.9925],
      VN: [14.0583, 108.2772], PH: [12.8797, 121.7740], PK: [30.3753, 69.3451]
    };
    return countryCoordinates[countryCode] || [0, 0];
  }
  

  // 🏳️ Fonction pour compter le nombre d'utilisateurs par pays
  countUsersByCountry() {
    this.listUser.forEach(user => {
      const countryCode = this.getCountryCode(user.country);
      if (countryCode !== "N/A") {
        if (this.countryUserCount[countryCode]) {
          this.countryUserCount[countryCode] += 1;
        } else {
          this.countryUserCount[countryCode] = 1;
        }
      }
    });
  }

  countUsers(){
    this.listUser.forEach(user => {
      this.UserCount++;
    })
  }

   // 🌍 Charger la carte avec les marqueurs et les tooltips
   loadMap() {
    const markers = Object.keys(this.countryUserCount).map(countryCode => ({
      name: countryCode, 
      coords: this.getCountryCoordinates(countryCode),
      style: {
        fill: "red",
        stroke: "#FFF",
        r: Math.min(10, this.countryUserCount[countryCode] * 2)
      },
      tooltip: {
        content: `${countryCode}: ${this.countryUserCount[countryCode]} utilisateurs`
      }
    }));

    new jsVectorMap({
      selector: "#world-map",
      map: "world",
      backgroundColor: "transparent",
      regionStyle: {
        initial: {
          fill: "#e4e4e4"
        }
      },
      markers: markers,
      markerStyle: {
        initial: {
          fill: "red",
          stroke: "#FFF"
        }
      },
      labels: {
        markers: {
          render: (marker: { tooltip: { content: string } }) => marker.tooltip.content
        }
      }
    });
  }

}

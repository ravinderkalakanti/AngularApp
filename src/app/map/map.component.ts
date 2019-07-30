import { Component, OnInit, ElementRef } from '@angular/core';
import { EsriLoaderService } from 'angular2-esri-loader';
import { Http, Response } from '@angular/http';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-map',
  providers:[EsriLoaderService,LocationService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private elRef:ElementRef, private esriLoader:EsriLoaderService, private http: Http,private locationService: LocationService) {

  }
  map: any;
	// tslint:disable-next-line:indent
	view: any;
  data: any;
  profile: any;

  peopleByCountry: any[] = [
    {
      'country': 'UK',
      'people': [
        {
          'name': 'Douglas  Pace'
        },
        {
          'name': 'Mcleod  Mueller'
        },
      ]
    },
    {
      'country': 'US',
      'people': [
        {
          'name': 'Day  Meyers'
        },
        {
          'name': 'Aguirre  Ellis'
        },
        {
          'name': 'Cook  Tyson'
        }
      ]
    }
  ];

    loadLocations(){
    this.locationService.getLocations().subscribe(data =>  data);
  }
  ngOnInit() {

    let link = 'assets/stateSample.json';
       this.http.request(link).subscribe((res: Response) => {
        console.log(res.json());
        this.data=res.json();
    });
  
  
    this.esriLoader.load({
      url: '//js.arcgis.com/4.3'
    }).then(() => {
      this.esriLoader.loadModules(['esri/Map', 'esri/views/SceneView','esri/layers/FeatureLayer','esri/layers/GraphicsLayer', 'esri/Graphic', 'esri/geometry/Point', 'esri/geometry/Extent', 'esri/geometry/SpatialReference',
      'esri/symbols/SimpleMarkerSymbol','esri/Color'])
        .then(([Map, SceneView, FeatureLayer, GraphicsLayer,Graphic,Point,Extent,SpatialReference,SimpleMarkerSymbol,Color]) => {
          this.map = new Map({
             basemap: 'streets',
    		     ground: 'world-elevation',
             layers: [
                new GraphicsLayer({
                    id: 'analysisLayer'
                }),
                new FeatureLayer({
                    url: 'https://services.arcgis.com/BG6nSlhZSAWtExvp/arcgis/rest/services/World_Volcanoes/FeatureServer/0',
                    id: 'volcanoesLayer'
                })
            ]

          });
          
           let  extent = new Extent({
            'xmin': 4137994.9632452107,
            'ymin': -589024.3221384265,
            'xmax': 13530576.99892517,
            'ymax': 4694303.072931551,
           
            'spatialReference': {
              'wkid': 102100,
              'latestWkid': 3857
            }
          });

          this.view = new SceneView({
             extent: extent,
            container: this.elRef.nativeElement.firstChild,
            map: this.map
          });
           
          
         
           let maxPOSvalue = 0,
                minPOSvalue = 1;

              

          
              
         let graphic;
          var pointGraphic ;
          this.data.forEach(point => {
          
          var name=point.name;
          var posval=point.posvalue;
          console.log('point==========',name);
                let posvalue;
                posvalue = parseInt(point['posvalue']);

                if (posvalue > maxPOSvalue) {
                  maxPOSvalue = posvalue;
                }
               var point = new Point({longitude: point.longitude,  latitude:  point.latitude  });
             //   graphic = new Graphic(new Point(point.longitude, point.latitude));

                    var size,
                    maxCircleRadius = 50,
                    value=parseInt(point['posvalue']),

                    minCircleRadius = 5;
                  var max_pos_value = maxPOSvalue;
                  var bluecolor = new Color([102, 160, 227, 1]);

                  if (max_pos_value <= 0) {
                    return;
                  }
                   console.log('point.name==',point.name);
                   console.log('point==========',point.name);
                  switch (true) {
                    case (value > 0 && value < 200):
                      size = minCircleRadius;
                      break;
                    case (value >= 200 && value < 400):
                      size = minCircleRadius + 2;
                      break;
                    case (value >= 400 && value < 600):
                      size = minCircleRadius + 4;
                      break;
                    case (value >= 600 && value < 800):
                      size = minCircleRadius + 6;
                      break;
                    case (value >= 800 && value < 1000):
                      size = minCircleRadius + 8;
                      break;
                    case (value >= 1000 && value < 3000):
                      size = minCircleRadius + 12;
                      break;
                    case (value >= 3000 && value < 5000):
                      size = minCircleRadius + 16;
                      break;
                    case (value >= 5000 && value < 7000):
                      size = minCircleRadius + 20;
                      break;
                    case (value >= 7000 && value < 9000):
                      size = minCircleRadius + 24;
                      break;
                    case (value >= 9000 && value < 11000):
                      size = minCircleRadius + 28;
                      break;
                    case (value >= 11000 && value < 20000):
                      size = minCircleRadius + 38;
                      break;
                    case (value >= 20000 && value < 30000):
                      size = minCircleRadius + 48;
                      break;
                    default:
                      size = maxCircleRadius;
                      break;
                  }
             
                     var markerSymbol = new SimpleMarkerSymbol({
                    color: [226, 119, 40],
                    width: size,
                    outline: { // autocasts as new SimpleLineSymbol()
                      color: [255, 255, 255],
                      width: 1
                    }
                  });
                   
                    var symbolAtt = {
                        Name: name,
                        POS: posvalue,
                       
                      };
                       
                   pointGraphic = new Graphic({
                      geometry: point,
                      symbol: markerSymbol,
                       attributes: symbolAtt,
                        popupTemplate: { // autocasts as new PopupTemplate()
                          title: '{Name}',
                          content: [{
                            type: 'fields',
                            fieldInfos: [{
                              fieldName: 'Name'
                            }, {
                              fieldName: 'POS'
                            }]
                          }]
                        }
                    });
                 
                    this.view.graphics.addMany([pointGraphic]);
              });
              
             // let map=this.map;
              // let graphicLayerId = 'graphicLayer';

               // let  graphicLayer =  map.get('graphicLayer') ||  new GraphicsLayer({ id: graphicLayerId, opacity: 0.75 });

              //graphicLayer.setRenderer(renderer);
             // drawCityLayer(result, maxPOSvalue);
              //this.map.add(graphicLayer);
          



        });
    });
  }

}

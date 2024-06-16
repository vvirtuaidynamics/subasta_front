export default function useGeoJson() {
  const geojsonTypes = {
    Feature: 'Feature',
    FeatureCollection: 'FeatureCollection',
  }

  const geometryTypes = {
    Point: 'Point',
    MultiPoint: 'MultiPoint',
    LineString: 'LineString',
    MultiLineString: 'MultiLineString',
    Polygon: 'Polygon',
    MultiPolygon: 'MultiPolygon',
  }


  function Feature({type, geometry, properties}) {
    this.type = type;
    this.geometry = geometry;
    this.properties = properties;
    return {
      type: this.type,
      geometry: this.geometry || {},
      properties: this.properties || {}
    }
  }

  function FeatureCollection({features}) {
    this.features = features || [];

    return {
      features: this.features,

    }
  }

  return {
    Feature,
    FeatureCollection,
  }

}
